import React from 'react';
import i18n from 'i18next';
import filter from 'leo-profanity';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, toast } from 'react-toastify';
import store from './slices/index';
import { actions as channelActions } from './slices/channelsSlice.js';
import { actions as messageActions } from './slices/messagesSlice.js';
import { AuthContextProvider } from './contexts/authContext.jsx';
import { ApiContext } from './contexts/apiContext.jsx';
import App from './components/App';
import resources from './locales/index.js';

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
    });

  filter.loadDictionary('ru');

  const socket = io();
  const { dispatch } = store;

  socket.on('newChannel', (data) => {
    dispatch(channelActions.addChannel({
      name: data.name, id: data.id, removable: data.removable,
    }));
  });

  socket.on('removeChannel', (data) => {
    dispatch(channelActions.removeChannel(data.id));
  });

  socket.on('renameChannel', (data) => {
    dispatch(channelActions.renameChannel(data));
  });

  socket.on('newMessage', (data) => {
    dispatch(messageActions.addMessage(data));
  });

  const ApiContextProvider = ({ children }) => {
    const sendMessage = (message) => {
      socket.emit('newMessage', message);
    };

    const getNewChannel = (channel) => {
      socket.emit('newChannel', channel);
    };

    const removeChannel = (id) => {
      socket.emit('removeChannel', { id });
    };

    const renameChannel = (id, name) => {
      socket.emit('renameChannel', { id, name });
    };

    const notify = (text) => toast.success(text, { position: toast.POSITION.TOP_RIGHT });

    const value = {
      sendMessage,
      getNewChannel,
      removeChannel,
      renameChannel,
      notify,
    };

    return (
      <ApiContext.Provider value={value}>
        { children }
        <ToastContainer autoClose={3000} />
      </ApiContext.Provider>
    );
  };

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RollbarProvider config={rollbarConfig}>
              <ErrorBoundary>
                <AuthContextProvider>
                  <ApiContextProvider>
                    <App />
                  </ApiContextProvider>
                </AuthContextProvider>
              </ErrorBoundary>
            </RollbarProvider>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

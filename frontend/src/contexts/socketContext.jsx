import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelActions } from '../slices/channelsSlice.js';
import { actions as messageActions } from '../slices/messagesSlice.js';

const SocketContext = createContext({});

const SocketContextProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
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
  }, [socket, dispatch]);

  const value = {
    sendMessage,
    getNewChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <SocketContext.Provider value={value}>
      { children }
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };

import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init';

const runApp = () => {
  const app = init()
    .then((item) => {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        item,
      );
    });
  return app;
};

runApp();

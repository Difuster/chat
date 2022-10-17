import addChannel from './addChannel';
import renameChannel from './renameChannel';
import removeChannel from './removeChannel';

const modalsWindow = {
  add: addChannel,
  rename: renameChannel,
  remove: removeChannel,
};

const showModal = (type) => modalsWindow[type];

export default showModal;

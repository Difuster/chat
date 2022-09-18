import { useContext } from 'react';

import SocketContext from '../contexts/socketContext.jsx';

const useSocket = () => useContext(SocketContext);

export default useSocket;

import { useContext } from 'react';

import AuthContext from '../contexts/authContext.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;

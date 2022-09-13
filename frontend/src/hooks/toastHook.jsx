import { useContext } from 'react';

import ToastContext from '../contexts/toastContext.jsx';

const useToast = () => useContext(ToastContext);

export default useToast;

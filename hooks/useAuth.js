/* eslint-disable import/no-anonymous-default-export */

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

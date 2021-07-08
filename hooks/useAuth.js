/* eslint-disable import/no-anonymous-default-export */

import { useContext } from 'react';
import AuthContext from '../context/authContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

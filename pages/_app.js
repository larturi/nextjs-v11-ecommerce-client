import React, { useMemo, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

import '../scss/global.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from '../context/authContext';
import { getToken, setToken, removeToken } from '../api/token';

export default function MyApp({ Component, pageProps }) {
   const [auth, setAuth] = useState(undefined);
   const [reloadUser, setReloadUser] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const token = getToken();

      if (token) {
         setAuth({
            token,
            idUser: jwtDecode(token).id,
         });
      } else {
         setAuth(null);
      }
      setReloadUser(false);
   }, [reloadUser]);

   const login = (token) => {
      setToken(token);
      setAuth({
         token,
         idUser: jwtDecode(token).id,
      });
   };

   const logout = () => {
      if (auth) {
         removeToken();
         setAuth(null);
         router.push('/');
      }
   };

   const authData = useMemo(
      () => ({
         auth,
         login,
         logout,
         setReloadUser,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [auth]
   );

   if (auth === undefined) return null;

   return (
      <AuthContext.Provider value={authData}>
         <Component {...pageProps} />
         <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={true}
         />
      </AuthContext.Provider>
   );
}

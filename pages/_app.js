import React, { useMemo, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

import '../scss/global.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

import {
   getProductsCart,
   addProductCart,
   countProductsCart,
   removeProductCart,
} from '../api/cart';

import { getToken, setToken, removeToken, removeCart } from '../api/token';

export default function MyApp({ Component, pageProps }) {
   const [auth, setAuth] = useState(undefined);
   const [reloadUser, setReloadUser] = useState(false);
   const [totalProductsCart, setTotalProductsCart] = useState(0);
   const [reloadCartCounter, setReloadCartCounter] = useState(false);
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

   useEffect(() => {
      setTotalProductsCart(countProductsCart());
      setReloadCartCounter(false);
   }, [reloadCartCounter, auth]);

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
         removeCart();
         setAuth(null);
         router.push('/');
      }
   };

   const addProduct = (product) => {
      const token = getToken();

      if (token) {
         addProductCart(product);
         setReloadCartCounter(true);
      } else {
         toast.warning(
            'Debes autenticarte para poder agregar productos a tu carrito.'
         );
      }
   };

   const removeProduct = (product) => {
      removeProductCart(product);
      setReloadCartCounter(true);
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

   const cartData = useMemo(
      () => ({
         productsCartCounter: totalProductsCart,
         addProductCart: (product) => addProduct(product),
         getProductsCart,
         removeProductCart: (product) => removeProduct(product),
         removeAllProductCart: () => null,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [totalProductsCart]
   );

   if (auth === undefined) return null;

   return (
      <AuthContext.Provider value={authData}>
         <CartContext.Provider value={cartData}>
            <Component {...pageProps} />
            <ToastContainer
               position='top-right'
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={true}
               closeOnClick={true}
               rtl={false}
               pauseOnFocusLoss={false}
               draggable={true}
               pauseOnHover={true}
            />
         </CartContext.Provider>
      </AuthContext.Provider>
   );
}

import { TOKEN, CART } from '../utils/constats';
import jwtDecode from 'jwt-decode';

export const setToken = (token) => {
   localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
   const token = localStorage.getItem(TOKEN);
   return token;
};

export const removeToken = () => {
   return localStorage.removeItem(TOKEN);
};

export const removeCart = () => {
   return localStorage.removeItem(CART);
};

export const hasExpiredToken = (token) => {
   const tokenDecode = jwtDecode(token);
   const expireDate = tokenDecode.exp * 1000;
   const currentDate = new Date().getTime();

   if (currentDate > expireDate) {
      return true;
   } else {
      return false;
   }
};

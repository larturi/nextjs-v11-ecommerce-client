import { toast } from 'react-toastify';
import { size, includes, remove } from 'lodash';
import { CART } from '../utils/constats';

export const getProductsCart = () => {
   try {
      const cart = localStorage.getItem(CART);

      if (!cart) {
         return null;
      } else {
         const products = cart.split(',');
         return products;
      }
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const addProductCart = (product) => {
   const cart = getProductsCart();

   if (!cart) {
      localStorage.setItem(CART, product);
      toast.success('Producto añadido al carrito');
   } else {
      const productFound = includes(cart, product);
      if (productFound) {
         toast.warning('El producto ya está en el carrito');
      } else {
         cart.push(product);
         localStorage.setItem(CART, cart);
         toast.success('Producto añadido al carrito');
      }
   }
};

export const countProductsCart = () => {
   const cart = getProductsCart();
   if (!cart) {
      return 0;
   } else {
      return size(cart);
   }
};

export const removeProductCart = (product) => {
   const cart = getProductsCart();
   if (!cart) {
      return 0;
   } else {
      remove(cart, (item) => {
         return item === product;
      });

      if (size(cart) > 0) {
         localStorage.setItem(CART, cart);
      } else {
         localStorage.removeItem(CART);
      }
   }
};

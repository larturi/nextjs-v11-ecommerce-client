import { createContext } from 'react';

const CartContext = createContext({
   productsCartCounter: 0,
   addProductToCart: () => null,
   getProductsCart: () => null,
   removeProductCart: () => null,
   removeAllProductCart: () => null,
});

export default CartContext;

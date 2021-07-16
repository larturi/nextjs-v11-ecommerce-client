import { authFetch } from '../utils/fetch';

export const getOrdersApi = (idUser, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/orders?_sort=created_at:desc&user=${idUser}`;
      const result = authFetch(url, null, logout);
      return result;
   } catch (error) {
      console.error(error);
      return null;
   }
};

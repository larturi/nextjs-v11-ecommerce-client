import { authFetch } from '../utils/fetch';

export const getProvinciasApi = async (logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/provincias`;
      const result = await authFetch(url, null, logout);
      return result ? result : null;
   } catch (error) {
      return null;
   }
};

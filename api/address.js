import { authFetch } from '../utils/fetch';

export const createAddressApi = async (address, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/addresses`;
      const params = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(address),
      };
      const result = await authFetch(url, params, logout);
      return result;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getAddressesApi = async (idUser, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/addresses?id_user=${idUser}`;
      const result = await authFetch(url, null, logout);
      return result;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const deleteAddressApi = async (idAddress, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/addresses/${idAddress}`;

      const params = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const result = await authFetch(url, params, logout);

      if (result.statusCode === 500)
         throw new Error('Error al intentar eliminar el domicilio');
      return true;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const updateAddressApi = async (idAddress, address, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/addresses/${idAddress}`;
      const params = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(address),
      };
      const result = await authFetch(url, params, logout);
      return result;
   } catch (error) {
      console.error(error);
      return null;
   }
};

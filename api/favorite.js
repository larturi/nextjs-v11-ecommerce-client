import { authFetch } from '../utils/fetch';
import { size } from 'lodash';

export const isFavoriteApi = async (idUser, idGame, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
      return await authFetch(url, null, logout);
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const addfavoriteApi = async (idUser, idGame, logout) => {
   try {
      const dataFound = await isFavoriteApi(idUser, idGame, logout);
      if (size(dataFound) > 0) {
         return 'El usuario ya tiene el juego en sus favoritos.';
      } else {
         const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/favorites`;

         const params = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               user: idUser,
               game: idGame,
            }),
         };

         return await authFetch(url, params, logout);
      }
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const deletefavoriteApi = async (idUser, idGame, logout) => {
   try {
      const dataFound = await isFavoriteApi(idUser, idGame, logout);
      const idFavorite = dataFound[0].id;
      if (size(dataFound) === 0) {
         return 'El usuario no tiene el juego en sus favoritos.';
      } else {
         const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/favorites/${idFavorite}`;

         const params = {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         };

         return await authFetch(url, params, logout);
      }
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getFavoritesApi = async (idUser, logout) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/favorites?user=${idUser}`;
      return await authFetch(url, null, logout);
   } catch (error) {
      console.error(error);
      return null;
   }
};

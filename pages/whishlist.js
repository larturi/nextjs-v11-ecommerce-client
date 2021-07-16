import React, { useState, useEffect } from 'react';
import { size, forEach } from 'lodash';
import { Loader } from 'semantic-ui-react';
import { getFavoritesApi } from '../api/favorite';
import useAuth from '../hooks/useAuth';
import BasicLayout from '../layouts/BasicLayout';
import Games from '../components/Games';
import Seo from '../components/Seo';

const Whishlist = () => {
   const [favorites, setFavorites] = useState(null);
   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getFavoritesApi(auth.idUser, logout);
         if (size(response) > 0) {
            const gameList = [];
            forEach(response, (data) => {
               gameList.push(data.game);
            });
            setFavorites(gameList);
         }
      })();
   }, [auth.idUser, logout]);

   return (
      <BasicLayout className='wishlist'>
         <Seo title='Favoritos' />

         <div className='wishlist__block'>
            <div className='title'>Lista de desesos</div>

            <div className='data'>
               {!favorites && <Loader active>Cargando...</Loader>}
               {favorites && size(favorites) === 0 && (
                  <h3>No tienes juegos marcados como favoritos</h3>
               )}
               {size(favorites) > 0 && (
                  <Games games={favorites} addCartButton={true} />
               )}
            </div>
         </div>
      </BasicLayout>
   );
};

export default Whishlist;

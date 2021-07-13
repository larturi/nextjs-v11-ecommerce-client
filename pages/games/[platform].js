import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { getGamesPlatformApi } from '../../api/game';
import Games from '../../components/Games';

const limitPerPage = 5;

const Platform = () => {
   const { query } = useRouter();
   const [games, setGames] = useState(null);

   useEffect(() => {
      (async () => {
         if (query.platform) {
            const games = await getGamesPlatformApi(
               query.platform,
               limitPerPage,
               0
            );
            if (size(games) > 0) {
               setGames(games);
            } else {
               setGames([]);
            }
         }
      })();
   }, [query.platform]);

   return (
      <BasicLayout className='platform'>
         {!games && <Loader active>Cargando...</Loader>}
         {games && size(games) === 0 && <h3>No hay Juegos</h3>}
         {size(games) > 0 && <Games games={games} />}
      </BasicLayout>
   );
};

export default Platform;

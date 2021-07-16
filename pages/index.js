import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import { getLastGamesApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout';
import Games from '../components/Games';
import Seo from '../components/Seo';

export default function Home() {
   const [games, setGames] = useState(null);

   useEffect(() => {
      (async () => {
         const games = await getLastGamesApi(50);
         if (size(games) > 0) {
            setGames(games);
         } else {
            setGames([]);
         }
      })();
   }, []);

   return (
      <div className='home'>
         <BasicLayout>
            <Seo />
            {!games && <Loader active>Cargando...</Loader>}
            {games && size(games) === 0 && <h3>No hay Juegos</h3>}
            {size(games) > 0 && <Games games={games} />}
         </BasicLayout>
      </div>
   );
}

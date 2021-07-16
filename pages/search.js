import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
import { searchGamesApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout';
import Games from '../components/Games';
import Seo from '../components/Seo';

const Search = () => {
   const [games, setGames] = useState(null);
   const { query } = useRouter();

   useEffect(() => {
      document.getElementById('search-game').focus();
   }, []);

   useEffect(() => {
      (async () => {
         if (query.query.length > 0) {
            const response = await searchGamesApi(query.query);
            size(response) > 0 ? setGames(response) : setGames([]);
         } else {
            setGames([]);
         }
      })();
   }, [query]);

   return (
      <BasicLayout className='search'>
         <Seo title={`Buscando: ${query.query}`} />
         {!games && <Loader active>Buscando...</Loader>}
         {games && size(games) === 0 && (
            <div>
               <h3>No se han encontrado juegos</h3>
            </div>
         )}
         {size(games) > 0 && <Games games={games} />}
      </BasicLayout>
   );
};

export default Search;

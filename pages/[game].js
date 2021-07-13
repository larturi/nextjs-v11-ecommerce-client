import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';

import BasiLayout from '../layouts/BasicLayout';
import HeaderGame from '../components/Game/HeaderGame';
import { getGameByUrlApi } from '../api/game';

const Game = () => {
   const { query } = useRouter();
   const [game, setGame] = useState(null);

   console.log(game);

   useEffect(() => {
      (async () => {
         const game = await getGameByUrlApi(query.game);
         setGame(game);
      })();
   }, [query]);

   if (!game) return <Loader active>Cargando...</Loader>;

   return (
      <BasiLayout>
         <HeaderGame game={game} />
         <p>TabsGame</p>
      </BasiLayout>
   );
};

export default Game;

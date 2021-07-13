import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';

import BasiLayout from '../layouts/BasicLayout';
import HeaderGame from '../components/Game/HeaderGame';
import TabsGame from '../components/Game/TabsGame';
import { getGameByUrlApi } from '../api/game';

const Game = () => {
   const { query } = useRouter();
   const [game, setGame] = useState(null);

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
         <TabsGame game={game} />
      </BasiLayout>
   );
};

export default Game;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';

import BasiLayout from '../layouts/BasicLayout';
import HeaderGame from '../components/Game/HeaderGame';
import TabsGame from '../components/Game/TabsGame';
import { getGameByUrlApi, getLastGamesApi } from '../api/game';
import Seo from '../components/Seo';

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
         <Seo title={game.title} description={game.description} />
         <HeaderGame game={game} />
         <TabsGame game={game} />
      </BasiLayout>
   );
};

export default Game;

export const getStaticPaths = async () => {
   const games = await getLastGamesApi(2000);

   const paths = games.map((game) => ({
      params: { game: game.url },
   }));

   return {
      paths,
      fallback: false,
   };
};

export const getStaticProps = async (context) => {
   const gameId = context.params?.id || '';
   const game = { id: gameId };
   return { props: { game } };
};

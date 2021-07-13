import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';
import useWindowSize from '../../hooks/useWindowSize';
import {
   breakpointUpSm,
   breakpointUpMd,
   breakpointUpLg,
} from '../../utils/breakpoint';

const Games = (props) => {
   const { width } = useWindowSize();

   const getColumnsRender = () => {
      switch (true) {
         case width > breakpointUpLg:
            return 5;
         case width > breakpointUpMd:
            return 4;
         case width > breakpointUpSm:
            return 3;
         default:
            return 2;
      }
   };

   const { games } = props;
   return (
      <div className='list-games'>
         <Grid>
            <Grid.Row columns={getColumnsRender()}>
               {map(games, (game) => (
                  <Game game={game} key={game.id} />
               ))}
            </Grid.Row>
         </Grid>
      </div>
   );
};

export default Games;

const Game = (props) => {
   const { game } = props;
   return (
      <Grid.Column className='list-games__game'>
         <Link href={`/${game.url}`}>
            <a>
               <div className='list-games__game-poster'>
                  <Image src={game.poster.url} alt={game.title} />
                  <div className='list-games__game-poster-info'>
                     {game.discount ? (
                        <span className='discount'>-{game.discount}%</span>
                     ) : (
                        <span />
                     )}
                     <span className='price'>{game.price}$</span>
                  </div>
               </div>
               <h2>{game.title}</h2>
            </a>
         </Link>
      </Grid.Column>
   );
};

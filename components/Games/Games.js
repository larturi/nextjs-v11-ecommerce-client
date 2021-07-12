import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';

const Games = (props) => {
   const { games } = props;
   return (
      <div className='list-games'>
         <Grid>
            <Grid.Row columns={5}>
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

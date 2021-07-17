import React from 'react';
import ReactPlayer from 'react-player/lazy';
import moment from 'moment';
import 'moment/locale/es';
import CarouselScreens from '../CarouselScreens/CarouselScreens';

const InfoGame = (props) => {
   const { game } = props;
   return (
      <div className='info-game player-wrapper'>
         <ReactPlayer
            className='info-game__video'
            url={game.video}
            controls={true}
         />
         <CarouselScreens title={game.title} screenshots={game.screenshots} />
         <div className='info-game__content'>
            <div dangerouslySetInnerHTML={{ __html: game.summary }} />

            <div className='info-game__content-date'>
               <h4>Fecha de lanzamiento:</h4>
               <p>{moment(game.releaseDate).format('LL')}</p>
            </div>
         </div>
      </div>
   );
};

export default InfoGame;

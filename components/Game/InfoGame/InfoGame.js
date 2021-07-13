import React from 'react';
import ReactPlayer from 'react-player/lazy';
import CarouselScreens from '../CarouselScreens/CarouselScreens';

const InfoGame = (props) => {
   const { game } = props;
   return (
      <div className='info-game'>
         <ReactPlayer
            className='info-game__video'
            url={game.video}
            controls={true}
         />
         <CarouselScreens title={game.title} screenshots={game.screenshots} />
      </div>
   );
};

export default InfoGame;

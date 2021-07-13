import React from 'react';
import ReactPlayer from 'react-player/lazy';

const InfoGame = (props) => {
   const { game } = props;
   return (
      <div className='info-game'>
         <ReactPlayer
            className='info-game__video'
            url={game.video}
            controls={true}
         />
      </div>
   );
};

export default InfoGame;

import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import classNames from 'classnames';
import {
   isFavoriteApi,
   addfavoriteApi,
   deletefavoriteApi,
} from '../../../api/favorite';

const HeaderGame = (props) => {
   const { game } = props;
   const { poster, title } = game;

   return (
      <Grid className='header-game'>
         <Grid.Column mobile={16} tablet={6} computer={5}>
            <Image src={poster.url} alt={title} fluid />
         </Grid.Column>

         <Grid.Column mobile={16} tablet={10} computer={11}>
            <InfoGame game={game} />
         </Grid.Column>
      </Grid>
   );
};

export default HeaderGame;

const InfoGame = (props) => {
   const { game } = props;
   const { title, summary, price, discount, url } = game;

   const { auth, logout } = useAuth();
   const { addProductCart } = useCart();

   const [isFavorite, setIsFavorite] = useState(false);
   const [reloadFavorite, setReloadFavorite] = useState(false);

   const addFavorite = async () => {
      if (auth) {
         await addfavoriteApi(auth.idUser, game.id, logout);
         setReloadFavorite(true);
      }
   };

   const deleteFavorite = async () => {
      await deletefavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
   };

   useEffect(() => {
      (async () => {
         if (auth) {
            const isFavorite = await isFavoriteApi(
               auth.idUser,
               game.id,
               logout
            );
            if (size(isFavorite) > 0) {
               setIsFavorite(true);
            } else {
               setIsFavorite(false);
            }
            setReloadFavorite(false);
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [game.id, logout, reloadFavorite]);

   return (
      <>
         <div className='header-game__title'>
            {title}
            <Icon
               name={isFavorite ? 'heart' : 'heart outline'}
               className={classNames({
                  like: isFavorite,
               })}
               link
               onClick={isFavorite ? deleteFavorite : addFavorite}
            />
         </div>

         <div className='header-game__delivery'>Entrega en 48h</div>

         <div
            className='header-game__summary'
            dangerouslySetInnerHTML={{ __html: summary }}
         />

         <div className='header-game__buy'>
            <div className='header-game__buy-price'>
               <p>Precio de venta al público: {price} $</p>
               <div className='header-game__buy-price-actions'>
                  <p>-{discount}%</p>
                  <p>
                     {(price - Math.floor(price * discount) / 100).toFixed(2)}$
                  </p>
               </div>
            </div>
            <Button
               className='header-game__buy-btn'
               onClick={() => addProductCart(url)}
            >
               Comprar
            </Button>
         </div>
      </>
   );
};

import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/es';
import BasicModal from '../../Modal/BasicModal';

const Order = (props) => {
   const { order } = props;
   const { game, totalPayment, created_at, addressShipping } = order;
   const { title, poster, url } = game;

   const [showModal, setShowModal] = useState(false);

   return (
      <>
         <div className='order'>
            <div className='order__info'>
               <div className='order__info-data'>
                  <Link href={`/${url}`}>
                     <a>
                        <Image src={poster.url} alt={title} />
                     </a>
                  </Link>
                  <div>
                     <h2 className='tituloGame'>{title}</h2>
                     <p className='precioGame'>${totalPayment} </p>
                     <p className='order__other-date'>
                        {moment(created_at).format('L')} -{' '}
                        {moment(created_at).format('LT')}
                     </p>
                  </div>
               </div>
            </div>
            <div className='order__other'>
               <Icon
                  name='eye'
                  circular
                  link
                  onClick={() => setShowModal(true)}
               />
            </div>
         </div>
         <AddressModal
            showModal={showModal}
            setShowModal={setShowModal}
            addressShipping={addressShipping}
            title={title}
         />
      </>
   );
};

export default Order;

const AddressModal = (props) => {
   const { showModal, setShowModal, addressShipping, title } = props;

   return (
      <BasicModal
         show={showModal}
         setShow={setShowModal}
         size='tiny'
         title={title}
      >
         <h3>El pedido se ha enviado a la siguiente dirección:</h3>
         <div>
            <p className='uppercase'>{addressShipping.name}</p>
            <p className='uppercase'>{addressShipping.address}</p>
            <p className='uppercase'>
               {addressShipping.id_provincia.nombre} (
               {addressShipping.postalCode})
            </p>
            <p>{addressShipping.phone}</p>
         </div>
      </BasicModal>
   );
};

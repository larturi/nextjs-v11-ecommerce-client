import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { STRIPE_TOKEN } from '../../../utils/constats';
import FormPayment from './FormPayment';

const stripePromise = loadStripe(STRIPE_TOKEN);

const Payment = (props) => {
   const { products, address } = props;
   return (
      <div className='payment'>
         <div className='title'>Pago</div>
         <div className='data'>
            <Elements stripe={stripePromise}>
               <FormPayment products={products} address={address} />
            </Elements>
         </div>
         <div>
            <p className='payment-info'>
               Esta es una aplicación con fines académicos, no es una aplicacion
               comercial. No ingrese su numero de tarjeta.
            </p>
         </div>
      </div>
   );
};

export default Payment;

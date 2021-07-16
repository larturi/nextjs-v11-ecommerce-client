/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { getOrdersApi } from '../api/order';
import useAuth from '../hooks/useAuth';
import Order from '../components/Orders/Order';
import Seo from '../components/Seo';

const Orders = () => {
   const [orders, setOrders] = useState(null);
   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getOrdersApi(auth.idUser, logout);
         setOrders(response || []);
      })();
   }, []);

   return (
      <BasicLayout className='orders'>
         <Seo title='Pedidos' />
         <div className='orders__block'>
            <div className='title'>Mis pedidos</div>
            <div className='data'>
               {size(orders) === 0 ? (
                  <h2 style={{ textAlign: 'center' }}>
                     Aún no has realizado ninguna compra
                  </h2>
               ) : (
                  <OrderList orders={orders} />
               )}
            </div>
         </div>
      </BasicLayout>
   );
};

export default Orders;

const OrderList = (props) => {
   const { orders } = props;

   return (
      <Grid>
         {map(orders, (order, i) => (
            <Grid.Column mobile={16} table={6} computer={8} key={i}>
               <Order order={order} />
            </Grid.Column>
         ))}
      </Grid>
   );
};

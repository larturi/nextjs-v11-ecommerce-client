/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import Link from 'next/link';
import classNames from 'classnames';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

const AddressShipping = (props) => {
   const { setAddress } = props;
   const [addresses, setAddresses] = useState(null);
   const [addressActive, setAddressActive] = useState(null);
   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getAddressesApi(auth.idUser, logout);
         setAddresses(response || []);
      })();
   }, []);

   return (
      <div className='address-shipping'>
         <div className='title'>Dirección de envío</div>
         <div className='data'>
            {size(addresses) === 0 ? (
               <h3>
                  No tienes ninguna dirección registrada.{' '}
                  <Link href='/account'>Registra tu dirección ahora!</Link>
               </h3>
            ) : (
               <Grid>
                  {map(addresses, (address) => (
                     <Grid.Column
                        key={address.id}
                        mobile={16}
                        tablet={8}
                        computer={4}
                     >
                        <Address
                           address={address}
                           addressActive={addressActive}
                           setAddressActive={setAddressActive}
                           setAddress={setAddress}
                        />
                     </Grid.Column>
                  ))}
               </Grid>
            )}
         </div>
      </div>
   );
};

export default AddressShipping;

const Address = (props) => {
   const { address, addressActive, setAddressActive, setAddress } = props;

   const changeAddress = () => {
      setAddressActive(address.id);
      setAddress(address);
   };

   return (
      <div
         className={classNames('address', {
            active: addressActive === address.id,
         })}
         onClick={changeAddress}
      >
         <p>{address.title}</p>
         <p>{address.name}</p>
         <p>{address.address}</p>
         <p>
            {address.id_provincia.nombre}, {address.city} , {address.postalCode}
         </p>
         <p>{address.phone}</p>
      </div>
   );
};

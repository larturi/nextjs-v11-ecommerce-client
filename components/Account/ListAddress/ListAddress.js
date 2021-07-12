import React, { useState, useEffect } from 'react';
import { getAddressApi } from '../../../api/address';
import { Grid, Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import { map, size } from 'lodash';

const ListAddress = () => {
   const [addresses, setAddresses] = useState([]);
   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getAddressApi(auth.idUser, logout);
         setAddresses(response || []);
      })();
   }, []);
   return (
      <div className='list-address'>
         {size(addresses) === 0 ? (
            <h3>No hay ninguna dirección</h3>
         ) : (
            <Grid>
               {map(addresses, (address) => (
                  <Grid.Column
                     key={address.id}
                     mobile={16}
                     tablet={8}
                     computer={4}
                  >
                     <Address address={address} />
                  </Grid.Column>
               ))}
            </Grid>
         )}
      </div>
   );
};

export default ListAddress;

const Address = (props) => {
   const { address } = props;
   return (
      <div className='address'>
         <p>{address.title}</p>
         <p>{address.name}</p>
         <p>{address.address}</p>
         <p>
            {address.id_provincia.nombre}, {address.city} , {address.postalCode}
         </p>
         <p>{address.phone}</p>

         <div className='actions'>
            <Button primary>Editar</Button>
            <Button>Eliminar</Button>
         </div>
      </div>
   );
};

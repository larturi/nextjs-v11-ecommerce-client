import React, { useState, useEffect } from 'react';
import { getAddressApi, deleteAddressApi } from '../../../api/address';
import { Grid, Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import { map, size } from 'lodash';

const ListAddress = (props) => {
   const { reloadAddresses, setReloadAddresses, openModal } = props;

   const [addresses, setAddresses] = useState([]);
   const { auth, logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getAddressApi(auth.idUser, logout);
         setAddresses(response || []);
         setReloadAddresses(false);
      })();
   }, [reloadAddresses]);

   if (!addresses) return null;

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
                     <Address
                        address={address}
                        logout={logout}
                        setReloadAddresses={setReloadAddresses}
                        openModal={openModal}
                     />
                  </Grid.Column>
               ))}
            </Grid>
         )}
      </div>
   );
};

export default ListAddress;

const Address = (props) => {
   const { address, logout, setReloadAddresses, openModal } = props;

   const [loadingDelete, setLoadingDelete] = useState(false);

   const deleteAddress = async () => {
      setLoadingDelete(true);
      const response = await deleteAddressApi(address.id, logout);
      if (response) {
         setReloadAddresses(true);
      }
      setLoadingDelete(false);
   };

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
            <Button
               primary
               onClick={() =>
                  openModal(`Editar domicilio: ${address.title}`, address)
               }
            >
               Editar
            </Button>
            <Button onClick={deleteAddress} loading={loadingDelete}>
               Eliminar
            </Button>
         </div>
      </div>
   );
};

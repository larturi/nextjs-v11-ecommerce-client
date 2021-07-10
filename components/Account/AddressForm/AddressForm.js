import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';

import useAuth from '../../../hooks/useAuth';
import { getProvinciasApi } from '../../../api/provincias';

const AddressForm = () => {
   const [provincias, setProvincias] = useState([
      { key: '', text: '', value: '' },
   ]);

   const { logout } = useAuth();

   useEffect(() => {
      (async () => {
         const response = await getProvinciasApi(logout);

         const provinciasMap = response.map((provincia) => {
            return {
               key: provincia.id,
               text: provincia.nombre,
               value: provincia.id,
            };
         });
         setProvincias(provinciasMap);
      })();
   }, []);

   return (
      <Form className='address-form'>
         <Form.Input
            name='title'
            type='text'
            label='Titulo del domicilio'
            placeholder='Titulo del domicilio'
         />

         <Form.Group widths='equal'>
            <Form.Input
               name='name'
               type='text'
               label='Nombre y Apellido'
               placeholder='Nombre y Apellido'
            />
            <Form.Input
               name='address'
               type='text'
               label='Dirección'
               placeholder='Dirección'
            />
         </Form.Group>

         <Form.Group widths='equal'>
            <Form.Input
               name='city'
               type='text'
               label='Ciudad'
               placeholder='Ciudad'
            />
            <Form.Dropdown
               name='state'
               placeholder='Provincia/Estado'
               label='Provincia/Estado'
               selection
               options={provincias}
            />
         </Form.Group>

         <Form.Group widths='equal'>
            <Form.Input
               name='postalCode'
               type='text'
               label='Código Postal'
               placeholder='Código Postal'
            />
            <Form.Input
               name='phone'
               type='text'
               label='Número de Teléfono'
               placeholder='Número de Teléfono'
            />
         </Form.Group>

         <div className='actions'>
            <Button className='submit' type='submit'>
               Guardar
            </Button>
         </div>
      </Form>
   );
};

export default AddressForm;

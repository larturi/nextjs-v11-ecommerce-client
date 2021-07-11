import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAuth from '../../../hooks/useAuth';
import { getProvinciasApi } from '../../../api/provincias';

const AddressForm = () => {
   const [provincias, setProvincias] = useState([
      { key: '', text: '', value: '' },
   ]);

   const { logout } = useAuth();

   const formik = useFormik({
      initialValues: initialValues(),
      mapPropsToValues: () => ({ state: '' }),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: (formData) => {
         console.log(formData);
      },
   });

   const handleChangeProvincia = (event, { value }) => {
      formik.values.state = value;
   };

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
      <Form className='address-form' onSubmit={formik.handleSubmit}>
         <Form.Input
            name='title'
            type='text'
            label='Titulo del domicilio'
            placeholder='Titulo del domicilio'
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
         />

         <Form.Group widths='equal'>
            <Form.Input
               name='name'
               type='text'
               label='Nombre y Apellido'
               placeholder='Nombre y Apellido'
               onChange={formik.handleChange}
               value={formik.values.name}
               error={formik.errors.name}
            />
            <Form.Input
               name='address'
               type='text'
               label='Dirección'
               placeholder='Dirección'
               onChange={formik.handleChange}
               value={formik.values.address}
               error={formik.errors.address}
            />
         </Form.Group>

         <Form.Group widths='equal'>
            <Form.Input
               name='city'
               type='text'
               label='Ciudad'
               placeholder='Ciudad'
               onChange={formik.handleChange}
               value={formik.values.city}
               error={formik.errors.city}
            />
            <Form.Dropdown
               name='state'
               placeholder='Provincia/Estado'
               label='Provincia/Estado'
               selection
               options={provincias}
               onChange={handleChangeProvincia}
               error={formik.errors.state}
            />
         </Form.Group>

         <Form.Group widths='equal'>
            <Form.Input
               name='postalCode'
               type='text'
               label='Código Postal'
               placeholder='Código Postal'
               onChange={formik.handleChange}
               value={formik.values.postalCode}
               error={formik.errors.postalCode}
            />
            <Form.Input
               name='phone'
               type='text'
               label='Número de Teléfono'
               placeholder='Número de Teléfono'
               onChange={formik.handleChange}
               value={formik.values.phone}
               error={formik.errors.phone}
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

const initialValues = () => {
   return {
      title: '',
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
   };
};

const validationSchema = () => {
   return {
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      address: Yup.string().required(true),
      city: Yup.string().required(true),
      state: Yup.string().required(true),
      postalCode: Yup.string().required(true),
      phone: Yup.string().required(true),
   };
};

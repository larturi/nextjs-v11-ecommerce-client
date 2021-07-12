import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAuth from '../../../hooks/useAuth';
import { getProvinciasApi } from '../../../api/provincia';
import { createAddressApi } from '../../../api/address';
import { toast } from 'react-toastify';

const AddressForm = (props) => {
   const { setShowModal, setReloadAddresses } = props;
   const [loading, setLoading] = useState(false);
   const [provincias, setProvincias] = useState([
      { key: '', text: '', value: '' },
   ]);

   const { auth, logout } = useAuth();

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: (formData) => {
         createAddress(formData);
      },
   });

   const createAddress = async (formData) => {
      setLoading(true);

      const formDataTemp = {
         ...formData,
         id_user: auth.idUser,
      };

      const response = await createAddressApi(formDataTemp, logout);

      if (!response) {
         toast.warning('Error al guardar la dirección');
         setLoading(false);
      } else {
         formik.resetForm();
         setLoading(false);
         setReloadAddresses(true);
         setShowModal(false);
      }

      setLoading(false);
   };

   const handleChangeProvincia = (event, { value }) => {
      formik.values.id_provincia = value;
      formik.errors.id_provincia = false;
      formik.validateForm();
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
               name='id_provincia'
               placeholder='Provincia/Estado'
               label='Provincia/Estado'
               selection
               options={provincias}
               onChange={handleChangeProvincia}
               error={formik.errors.id_provincia}
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
            <Button className='submit' type='submit' loading={loading}>
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
      id_provincia: '',
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
      id_provincia: Yup.number().required(true),
      postalCode: Yup.string().required(true),
      phone: Yup.string().required(true),
   };
};

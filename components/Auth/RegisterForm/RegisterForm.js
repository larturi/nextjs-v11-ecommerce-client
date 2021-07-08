import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';

const RegisterForm = (props) => {
   const { showLoginForm } = props;

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: (formData) => {
         registerApi(formData);
      },
   });

   return (
      <Form className='login-form' onSubmit={formik.handleSubmit}>
         <Form.Input
            name='name'
            type='text'
            placeholder='Nombre'
            onChange={formik.handleChange}
            error={formik.errors.name}
         />
         <Form.Input
            name='lastname'
            type='text'
            placeholder='Apellido'
            onChange={formik.handleChange}
            error={formik.errors.lastname}
         />
         <Form.Input
            name='username'
            type='text'
            placeholder='Usuario'
            onChange={formik.handleChange}
            error={formik.errors.username}
         />
         <Form.Input
            name='email'
            type='text'
            placeholder='Email'
            onChange={formik.handleChange}
            error={formik.errors.email}
         />
         <Form.Input
            name='password'
            type='password'
            placeholder='Password'
            onChange={formik.handleChange}
            error={formik.errors.password}
         />

         <div className='actions'>
            <Button type='button' basic>
               Iniciar Sesión
            </Button>
            <Button type='submit' className='submit'>
               Registrar
            </Button>
         </div>
      </Form>
   );
};

const initialValues = () => {
   return {
      name: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
   };
};

const validationSchema = () => {
   return {
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
      username: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
   };
};

export default RegisterForm;
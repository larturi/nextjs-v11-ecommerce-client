import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';
import { toast } from 'react-toastify';

const RegisterForm = (props) => {
   const { showLoginForm } = props;

   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);
         const response = await registerApi(formData);

         if (response?.jwt) {
            toast.success('Registro exitoso!');
            showLoginForm();
         } else {
            toast.error('Error al registrar el usuario.');
         }

         setLoading(false);
      },
   });

   return (
      <Form
         className='login-form'
         autoComplete='off'
         onSubmit={formik.handleSubmit}
      >
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
            <Button
               type='submit'
               className='submit registerBtn'
               loading={loading}
            >
               Registrar
            </Button>

            <Button type='button' basic onClick={showLoginForm}>
               Iniciar Sesión
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

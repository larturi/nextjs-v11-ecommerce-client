import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../../../api/user';

const ChangePasswordForm = (props) => {
   const { user, logout, setReloadUser } = props;
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);

         const response = await updatePasswordApi(
            user.id,
            formData.password,
            logout
         );

         if (!response) {
            toast.error('Error al actualizar la contraseña');
         } else {
            logout(true);
            toast.success('Contraseña actualizada correctamente');
         }

         setLoading(false);
      },
   });

   return (
      <div className='change-name-form'>
         <h4>Modificar contraseña</h4>
         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths='equal'>
               <Form.Input
                  name='password'
                  type='password'
                  placeholder='Contraseña'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password}
               />
               <Form.Input
                  name='repeatPassword'
                  type='password'
                  placeholder='Repetir Contraseña'
                  onChange={formik.handleChange}
                  value={formik.values.repeatPassword}
                  error={formik.errors.repeatPassword}
               />
            </Form.Group>

            <Button type='submit' className='submit' loading={loading}>
               Actualizar
            </Button>
         </Form>
      </div>
   );
};

export default ChangePasswordForm;

const initialValues = () => ({
   password: '',
   repeatPassword: '',
});

const validationSchema = () => ({
   password: Yup.string()
      .required(true)
      .oneOf([Yup.ref('repeatPassword')], true),
   repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref('password')], true),
});

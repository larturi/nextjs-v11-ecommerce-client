import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { updateEmailApi } from '../../../api/user';

const ChangeEmailForm = (props) => {
   const { user, logout, setReloadUser } = props;
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);

         const response = await updateEmailApi(user.id, formData.email, logout);

         if (!response) {
            toast.error('Error al actualizar el email');
         } else if (response?.statusCode === 400) {
            toast.error(
               'Error al actualizar el email: El email ya esta en uso'
            );
         } else {
            setReloadUser(true);
            toast.success('El email ha sido actualizado');
         }

         setLoading(false);
      },
   });

   return (
      <div className='change-email-form'>
         <h4>
            Modificar Email <span>(Tu email actual: {user.email})</span>
         </h4>

         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths='equal'>
               <Form.Input
                  name='email'
                  placeholder='Tu nuevo email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
               />
               <Form.Input
                  name='repeatEmail'
                  placeholder='Confirma tu nuevo email'
                  onChange={formik.handleChange}
                  value={formik.values.repeatEmail}
                  error={formik.errors.repeatEmail}
               />
            </Form.Group>

            <Button type='submit' className='submit' loading={loading}>
               Actualizar
            </Button>
         </Form>
      </div>
   );
};

export default ChangeEmailForm;

const initialValues = () => ({
   email: '',
   repeatEmail: '',
});

const validationSchema = () => ({
   email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref('repeatEmail')], true),
   repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref('email')], true),
});

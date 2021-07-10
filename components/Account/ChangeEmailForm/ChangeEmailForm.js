import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const ChangeEmailForm = (props) => {
   const { user, logout, setReloadUser } = props;
   return (
      <div className='change-email-form'>
         <h4>
            Cambia tu email <span>(Tu email actual: {user.email})</span>
         </h4>

         <Form>
            <Form.Group widths='equal'>
               <Form.Input name='email' placeholder='Tu nuevo email' />
               <Form.Input
                  name='repeatEmail'
                  placeholder='Confirma tu nuevo email'
               />
            </Form.Group>

            <Button className='submit'>Actualizar</Button>
         </Form>
      </div>
   );
};

export default ChangeEmailForm;

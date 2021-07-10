import { Form, Button } from 'semantic-ui-react';

const ChangeNameForm = () => {
   return (
      <div className='change-name-form'>
         <h4>Modificar mis datos</h4>
         <Form>
            <Form.Group widths='equal'>
               <Form.Input name='name' placeholder='Nombre' />
               <Form.Input name='lastname' placeholder='Apellido' />
            </Form.Group>

            <Button className='submit'>Actualizar</Button>
         </Form>
      </div>
   );
};

export default ChangeNameForm;

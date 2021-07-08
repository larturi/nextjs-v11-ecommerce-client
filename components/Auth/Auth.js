import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = (props) => {
   const { onCloseModal, setTitleModal } = props;
   const [showLogin, setShowLogin] = useState(true);

   const showLoginForm = () => {
      setShowLogin(true);
      setTitleModal('Iniciar Sesión');
   };
   const showRegisterForm = () => {
      setShowLogin(false);
      setTitleModal('Registro');
   };

   return showLogin ? (
      <LoginForm
         showRegisterForm={showRegisterForm}
         onCloseModal={onCloseModal}
      />
   ) : (
      <RegisterForm showLoginForm={showLoginForm} />
   );
};

export default Auth;

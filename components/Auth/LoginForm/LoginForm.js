const LoginForm = (props) => {
   const { showRegisterForm } = props;
   return (
      <div>
         <h1>LOGIN</h1>
         <button onClick={showRegisterForm}>Ir a registro</button>
      </div>
   );
};

export default LoginForm;

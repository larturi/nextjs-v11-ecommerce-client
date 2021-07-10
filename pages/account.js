import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import BasicLayout from '../layouts/BasicLayout';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';

const Account = () => {
   const router = useRouter();
   const { auth, logout } = useAuth();
   const [user, setUser] = useState(undefined);

   useEffect(() => {
      (async () => {
         const response = await getMeApi(logout);
         setUser(user || null);
      })();
   }, [auth]);

   if (user === undefined) return null;

   if (!auth & !user) {
      router.replace('/');
      return null;
   }

   return (
      <BasicLayout className='account'>
         <Configuration />
      </BasicLayout>
   );
};

export default Account;

const Configuration = () => {
   return (
      <div className='account__configuration'>
         <div className='title'>Configuración</div>
         <div className='data'>Formularios</div>
      </div>
   );
};

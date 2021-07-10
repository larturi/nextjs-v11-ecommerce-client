import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import BasicLayout from '../layouts/BasicLayout';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';

const Account = () => {
   const router = useRouter();
   const { auth, logout, setReloadUser } = useAuth();
   const [user, setUser] = useState(undefined);

   useEffect(() => {
      (async () => {
         const response = await getMeApi(logout);
         setUser(response || null);
      })();
   }, [auth, logout]);

   if (user === undefined) return null;

   if (!auth & !user) {
      router.replace('/');
      return null;
   }

   return (
      <BasicLayout className='account'>
         <Configuration
            user={user}
            logout={logout}
            setReloadUser={setReloadUser}
         />
      </BasicLayout>
   );
};

export default Account;

const Configuration = (props) => {
   const { user, logout, setReloadUser } = props;

   return (
      <div className='account__configuration'>
         <div className='title'>Configuración</div>
         <div className='data'>
            <ChangeNameForm
               user={user}
               logout={logout}
               setReloadUser={setReloadUser}
            />
         </div>
      </div>
   );
};

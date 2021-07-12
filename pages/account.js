import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm';
import AddressForm from '../components/Account/AddressForm';
import ListAddress from '../components/Account/ListAddress';
import BasicModal from '../components/Modal/BasicModal';
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
         <Addresses />
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
            <ChangeEmailForm
               user={user}
               logout={logout}
               setReloadUser={setReloadUser}
            />
            <ChangePasswordForm
               user={user}
               logout={logout}
               setReloadUser={setReloadUser}
            />
         </div>
      </div>
   );
};

const Addresses = () => {
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState('');
   const [formModal, setFormModal] = useState(null);
   const [reloadAddresses, setReloadAddresses] = useState(false);

   const openModal = (title) => {
      setTitleModal(title);
      setFormModal(
         <AddressForm
            setShowModal={setShowModal}
            setReloadAddresses={setReloadAddresses}
         />
      );
      setShowModal(true);
   };

   return (
      <div className='account__addresses'>
         <div className='title'>
            Direcciones
            <Icon
               name='plus'
               link
               onClick={() => openModal('Nueva Dirección')}
            />
         </div>
         <div className='data'>
            <ListAddress
               reloadAddresses={reloadAddresses}
               setReloadAddresses={setReloadAddresses}
            />
         </div>
         <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
            {formModal}
         </BasicModal>
      </div>
   );
};

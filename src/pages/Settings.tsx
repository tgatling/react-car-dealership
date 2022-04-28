import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

import AlertDisplay from '../components/UI/AlertDisplay';
import Profile from '../components/settings/Profile';

import { ALERT } from '../models/constants';
import { User } from '../models/user';

const Settings = () => {
  const userState = useSelector((state: RootStateOrAny) => state.user);
  const currentUser: User = JSON.parse(userState.currentUser);
  const [httpError, setHttpError] = useState('');

  const exitAlert = () => {
    setHttpError('');
  };

  return (
    <div style={{ margin: '40px 80px 0 80px' }}>
      {httpError && (
        <AlertDisplay
          type={ALERT.ERROR.TYPE}
          heading='UNABLE TO GET USER'
          message='Please check the user id and try again.'
          onExit={exitAlert}
        />
      )}
      <h1>Account Settings</h1>
      {currentUser.userRole && (
        <Profile user={currentUser} currentUserRole={currentUser.userRole} />
      )}
    </div>
  );
};

export default Settings;

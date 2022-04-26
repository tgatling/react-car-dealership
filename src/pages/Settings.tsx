import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import Profile from '../components/settings/Profile';
import AlertDisplay from '../components/UI/AlertDisplay';
import { ALERT } from '../models/constants';
import { User } from '../models/user';
import userService from '../services/user.service';

const Settings = () => {
  const user = useSelector((state: RootStateOrAny) => state.user.currentUser);
  const currentUser = JSON.parse(user);

  const [userProfile, setUserProfile] = useState<User>(currentUser);
  const [httpError, setHttpError] = useState('');

  const changeUser = (userId: string) => {
    userService
      .getUser(userId)
      .then((response) => {
        setUserProfile(response);
      })
      .catch((error) => setHttpError(error));
    console.log(`Change user: ${userId}`);
  };

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
      <Profile user={userProfile} submitUserId={changeUser} />
    </div>
  );
};

export default Settings;

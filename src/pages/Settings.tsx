import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import Profile from '../components/settings/Profile';
import { User } from '../models/user';

const Settings = () => {
  const user = useSelector((state: RootStateOrAny) => state.user.currentUser);
  const currentUser = JSON.parse(user);

  const [userProfile, setUserProfile] = useState<User>(currentUser);
  
  const changeUser = (userId: string) => {
      console.log(`Change user: ${userId}`);
  }

  return (
    <div style={{ margin: '40px 80px 0 80px' }}>
      <h1>Account Settings</h1>
      <Profile user={userProfile} />
    </div>
  );
};

export default Settings;

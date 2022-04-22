import React, { useEffect, useState } from 'react';

import InfoBar from './InfoBar';
import NavigationBar from './NavigationBar';
import UserBar from './UserBar';
import { useSelector, RootStateOrAny } from 'react-redux';

const Header = () => {
  const userState = useSelector((state: RootStateOrAny) => state.user);
  const [username, setUsername] = useState('to our site');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (userState.currentUser) {
      let currentUser = JSON.parse(userState.currentUser);

      if (currentUser.username) {
        setUsername(currentUser.username);
      }

      if (currentUser.userId) {
        setUserId(currentUser.userId);
      }
    }
  }, [userState.currentUser, username]);

  return (
    <div>
      <InfoBar />
      <NavigationBar />
      {userState.isLoggedIn && <UserBar username={username} userId={userId} />}
    </div>
  );
};

export default Header;

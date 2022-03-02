import React from 'react';

import InfoBar from './InfoBar';
import NavigationBar from './NavigationBar';
import UserBar from './UserBar';
import {useSelector, RootStateOrAny} from 'react-redux';

const Header = () => {
  const userState = useSelector((state: RootStateOrAny)=> state.user);

    return (
        <div>
      <InfoBar />
      <NavigationBar />
      {userState.isLoggedIn && <UserBar username={'Username'} />}
        </div>
    );
};

export default Header;
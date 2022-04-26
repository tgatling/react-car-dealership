import React from 'react';

import defaultUser from '../../images/defaultUser.png';
import { User } from '../../models/user';
import BackOffice from './BackOffice';
import GeneralInformation from './GeneralInformation';
import PasswordChange from './PasswordChange';
import ChangeUser from './ChangeUser';

import styles from './Profile.module.css';

interface profileProp {
  user: User;
}

const Profile = ({ user }: profileProp) => {

  console.log(user);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.pictureContainer}>
        {user.userId && <ChangeUser userId={user.userId} />}

        <h2>Profile Picture</h2>
        <img src={defaultUser} alt='' />
      </div>
      <GeneralInformation user={user} />
      <PasswordChange />
      <BackOffice user={user} />
    </div>
  );
};

export default Profile;

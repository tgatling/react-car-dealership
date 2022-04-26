import React from 'react';

import defaultUser from '../../images/defaultUser.png';
import { User } from '../../models/user';
import GeneralInformation from './GeneralInformation';
import PasswordChange from './PasswordChange';
import styles from './Profile.module.css';

interface profileProp {
  user: User;
}

const Profile = ({ user }: profileProp) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.pictureContainer}>
        <h2>Profile Picture</h2>
        <img src={defaultUser} alt='' />
      </div>
      <GeneralInformation user={user} />
      <PasswordChange/>
    </div>
  );
};

export default Profile;

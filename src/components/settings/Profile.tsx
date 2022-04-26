import React from 'react';

import defaultUser from '../../images/defaultUser.png';
import { DEALER_ROLE } from '../../models/constants';
import { User } from '../../models/user';
import BackOffice from './BackOffice';
import GeneralInformation from './GeneralInformation';
import PasswordChange from './PasswordChange';

import styles from './Profile.module.css';

interface profileProp {
  user: User;
  currentUserRole: string;
}

const Profile = ({ user, currentUserRole }: profileProp) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.pictureContainer}>
        <h2>Profile Picture</h2>
        <img src={defaultUser} alt='' />
      </div>
      <GeneralInformation user={user} />
      <PasswordChange />
      {currentUserRole === DEALER_ROLE && <BackOffice user={user} />}
    </div>
  );
};

export default Profile;

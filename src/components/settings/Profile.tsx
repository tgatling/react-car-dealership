import React from 'react';

import GeneralInformation from './GeneralInformation';
import PasswordChange from './PasswordChange';
import defaultUser from '../../images/defaultUser.png';
import BackOffice from './BackOffice';
import styles from './Profile.module.css';

import { DEALER_ROLE } from '../../models/constants';
import { User } from '../../models/user';

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

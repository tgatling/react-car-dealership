import React from 'react';

import defaultUser from '../../images/defaultUser.png';
import { User } from '../../models/user';
import BackOffice from './BackOffice';
import ChangeUser from './ChangeUser';
import GeneralInformation from './GeneralInformation';
import PasswordChange from './PasswordChange';

import styles from './Profile.module.css';

interface profileProp {
  user: User;
  submitUserId: (id: string)=> void;
}

const Profile = ({ user, submitUserId }: profileProp) => {

  console.log(user);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.pictureContainer}>
        {user.userId && <ChangeUser userId={user.userId} submitUserId={submitUserId} />}

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

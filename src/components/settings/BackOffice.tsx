import React, { useState } from 'react';
import { User } from '../../models/user';

import styles from './Profile.module.css';

interface infoProp {
  user: User;
}

const BackOffice = ({ user }: infoProp) => {
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <form className={styles.infoContainer}>
      <h2>For Office Use</h2>
      <div className={styles.inputRow}>
        <label>User Role</label>
        <input
          className={styles.shortInput}
          value={user.userRole}
          onChange={(e) => setUserRole(e.target.value)}
        />
        <label>User Id</label>
        <input
          className={styles.regInput}
          value={user.userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
    </form>
  );
};

export default BackOffice;

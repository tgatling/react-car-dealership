import React from 'react';
import { User } from '../../models/user';

import styles from './Profile.module.css';

interface infoProp {
  user: User;
}

const BackOffice = ({ user }: infoProp) => {
  return (
    <form className={styles.infoContainer}>
      <h2>For Office Use</h2>
      <div className={styles.inputRow}>
        <label>User Role</label>
        <input className={styles.shortInput} value={user.userRole} />
        <label>User Id</label>
        <input className={styles.regInput} value={user.userId} />
      </div>
    </form>
  );
};

export default BackOffice;

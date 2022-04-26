import React from 'react';

import styles from './Profile.module.css';

const PasswordChange = () => {
  return (
    <form className={styles.infoContainer}>
      <h2>Password</h2>
      <div>
        <label>New Password</label>
        <input />
        <label>Confirm Password</label>
        <input />
      </div>
    </form>
  );
};

export default PasswordChange;

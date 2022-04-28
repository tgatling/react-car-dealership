import React, { useState } from 'react';

import styles from './Profile.module.css';

const PasswordChange = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (newPassword === confirmedPassword) {
      console.log('Password Change Form Submitted');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <form className={styles.infoContainer} onSubmit={submitHandler}>
      <h2>Password</h2>
      <div className={styles.inputRow}>
        <label>New Password</label>
        <input
          className={styles.regInput}
          type='password'
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          className={styles.regInput}
          type='password'
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
      </div>
    </form>
  );
};

export default PasswordChange;

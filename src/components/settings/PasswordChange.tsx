import React from 'react';

import styles from './Profile.module.css';

const PasswordChange = () => {

    const submitHandler = () => {
        console.log('Password Change Form Submitted');
      };

  return (
    <form className={styles.infoContainer} onSubmit={submitHandler}>
      <h2>Password</h2>
      <div className={styles.inputRow}>
        <label>New Password</label>
        <input  className={styles.regInput}/>
        <label>Confirm Password</label>
        <input  className={styles.regInput}/>
      </div>
    </form>
  );
};

export default PasswordChange;

import React from 'react';
import { User } from '../../models/user';

import styles from './Profile.module.css';

interface infoProp {
  user: User;
}

const GeneralInformation = ({ user }: infoProp) => {

    const submitHandler = () => {
        console.log('General Information Form Submitted');
      };

  return (
    <form className={styles.infoContainer} onSubmit={submitHandler}>
      <h2>General Information</h2>
      <div className={styles.inputRow}>
        <label>First Name</label>
        <input className={styles.regInput} value={user.firstName} />
        <label>Last Name</label>
        <input className={styles.regInput} value={user.lastName} />
      </div>
      <div className={styles.inputRow}>
        <label>Username</label>
        <input className={styles.regInput} value={user.username} />
      </div>
      <div className={styles.inputRow}>
        <label>Email</label>
        <input className={styles.regInput} value={user.email} />
        <label>Phone Number</label>
        <input className={styles.shortInput} value={user.phoneNumber} />
      </div>
      <label>Address</label>
      <input className={styles.extraLongInput} value={user.address} />
      <div className={styles.inputRow}>
        <label>City</label>
        <input className={styles.regInput} value={user.city} />
        <label>State</label>
        <input className={styles.miniInput} value={user.state} />
        <label>Zip</label>
        <input className={styles.shortInput} value={user.zip} />
      </div>
    </form>
  );
};

export default GeneralInformation;

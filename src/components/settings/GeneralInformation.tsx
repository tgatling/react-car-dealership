import React from 'react';
import { User } from '../../models/user';

import styles from './Profile.module.css';

interface infoProp {
  user: User;
}

const GeneralInformation = ({ user }: infoProp) => {
  return (
    <form className={styles.infoContainer}>
      <h2>General Information</h2>
      <div className={styles.inputRow}>
        <label>First Name</label>
        <input value={user.firstName} />
        <label>Last Name</label>
        <input value={user.lastName} />
      </div>
      <div className={styles.inputRow}>
        <label>Username</label>
        <input value={user.username} />
      </div>
      <div className={styles.inputRow}>
        <label>Email</label>
        <input value={user.email} />
        <label>Phone Number</label>
        <input />
      </div>
      <label>Address</label>
      <input />
      <label>City</label>
      <input />
      <label>State</label>
      <input />
      <label>Zip</label>
      <input />
    </form>
  );
};

export default GeneralInformation;

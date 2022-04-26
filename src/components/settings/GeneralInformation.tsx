import React, { useState } from 'react';
import { User } from '../../models/user';

import styles from './Profile.module.css';

interface infoProp {
  user: User;
}

const GeneralInformation = ({ user }: infoProp) => {
  const [firstname, setFirstname] = useState(user.firstName);
  const [lastname, setLastname] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [zip, setZip] = useState<number | string | undefined>(user.zip);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('General Information Form Submitted');
  };

  return (
    <form className={styles.infoContainer} onSubmit={submitHandler}>
      <h2>General Information</h2>
      <div className={styles.inputRow}>
        <label>First Name</label>
        <input
          className={styles.regInput}
          type='text'
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <label>Last Name</label>
        <input
          className={styles.regInput}
          type='text'
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
      </div>
      <div className={styles.inputRow}>
        <label>Username</label>
        <input
          className={styles.regInput}
          type='text'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={styles.inputRow}>
        <label>Email</label>
        <input
          className={styles.regInput}
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Phone Number</label>
        <input
          className={styles.shortInput}
          type='text'
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <label>Address</label>
      <input
        className={styles.extraLongInput}
        type='text'
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <div className={styles.inputRow}>
        <label>City</label>
        <input
          className={styles.regInput}
          type='text'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <label>State</label>
        <input
          className={styles.miniInput}
          type='text'
          maxLength={2}
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <label>Zip</label>
        <input
          className={styles.shortInput}
          type='number'
          min={10000}
          max={99999}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default GeneralInformation;

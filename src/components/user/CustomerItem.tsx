import React from 'react';

import styles from './Customers.module.css';

import { User } from '../../models/user';

interface itemProp {
  user: User;
}

const CustomerItem = ({ user }: itemProp) => {
  return (
    <div className={styles.item}>
      <p className={styles.boldText}>{user.username}</p>
    </div>
  );
};

export default CustomerItem;

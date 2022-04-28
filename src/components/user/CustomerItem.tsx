import React from 'react';

import styles from './Customers.module.css';

import { User } from '../../models/user';

interface itemProp {
  user: User;
  selectName?: (userId: string) => void;
}

const CustomerItem = ({ user, selectName }: itemProp) => {
  const selectUsersName = () => {
    if (user.userId && selectName) {
      selectName(user.userId);
    }
  };
  return (
    <div>
      {selectName ? (
        <div className={styles.clickableItem} onClick={selectUsersName}>
          <p className={styles.boldText}>{user.username}</p>
        </div>
      ) : (
        <div className={styles.item} onClick={selectName}>
          <p className={styles.boldText}>{user.username}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerItem;

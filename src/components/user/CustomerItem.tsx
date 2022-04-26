import React from 'react';
import {User} from '../../models/user';

import styles from './Customers.module.css';

interface itemProp {
    user: User;
}

const CustomerItem = ({user}: itemProp) => {
    return (
        <div className={styles.item}>
            <p className={styles.boldText}>{user.username}</p>
        </div>
    );
};

export default CustomerItem;
import React from 'react';
import { NavLink } from 'react-router-dom';

import {CURRENT_OFFERS, PAYMENT_HISTORY, VIEW_YOUR_CARS} from '../../models/constants';
import styles from './UserBar.module.css';

interface userProps {
  username: string;
}

const UserBar = ({ username }: userProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.welcome}>{`Welcome ${username}`}</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={VIEW_YOUR_CARS} activeClassName={styles.active}>View Your Cars</NavLink>
          </li>
          <li>
            <NavLink to={PAYMENT_HISTORY} activeClassName={styles.active}>Payment History</NavLink>
          </li>
          <li>
            <NavLink to={CURRENT_OFFERS} activeClassName={styles.active}>Current Offers</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserBar;

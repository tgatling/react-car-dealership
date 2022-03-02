import React from 'react';
import { NavLink } from 'react-router-dom';

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
            <NavLink to={'/my-cars'}>View Your Cars</NavLink>
          </li>
          <li>
            <NavLink to={'/my-payments'}>Payment History</NavLink>
          </li>
          <li>
            <NavLink to={'/my-offers'}>Current Offers</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserBar;

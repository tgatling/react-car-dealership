import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  CURRENT_OFFERS,
  PAYMENT_HISTORY,
  VIEW_YOUR_CARS,
  MESSAGES,
} from '../../models/constants/constants';
import email from '../../images/email.png';
import tealEmail from '../../images/teal-email.png';
import styles from './UserBar.module.css';

interface userProps {
  username: string;
  userId: string;
}

const UserBar = ({ username, userId }: userProps) => {
  const unreadCount = useSelector(
    (state: RootStateOrAny) => state.message.unread
  );

  // determine how many are unread
  return (
    <header className={styles.header}>
      <div className={styles.welcome}>{`Welcome ${username}`}</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={VIEW_YOUR_CARS} activeClassName={styles.active}>
              View Your Cars
            </NavLink>
          </li>
          <li>
            <NavLink to={PAYMENT_HISTORY} activeClassName={styles.active}>
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to={CURRENT_OFFERS} activeClassName={styles.active}>
              Current Offers
            </NavLink>
          </li>
          <li className={styles.email}>
            <NavLink to={MESSAGES}>
              {unreadCount > 0 ? (
                <img src={tealEmail} alt='' />
              ) : (
                <img src={email} alt='' />
              )}
              {/* <p>{unreadCount}</p> */}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserBar;

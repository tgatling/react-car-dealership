import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import tealEmail from '../../../images/icons/teal-email-icon.png';
import settings from '../../../images/icons/settings-icon.png';
import styles from './UserBar.module.css';
import email from '../../../images/icons/email-icon.png';

import {
  OFFER_HISTORY,
  PAYMENT_HISTORY,
  VIEW_YOUR_CARS,
  MESSAGES,
  SETTINGS,
} from '../../../models/constants';

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
            <NavLink to={OFFER_HISTORY} activeClassName={styles.active}>
              Offer History
            </NavLink>
          </li>
          <li className={styles.icon}>
            <div className={styles.indicatorBase}>
              <NavLink to={MESSAGES}>
                {unreadCount > 0 ? (
                  <div>
                    <img src={tealEmail} alt='' />
                    <div className={styles.indicator}>
                      <div className={styles.msgCount}>{unreadCount}</div>
                    </div>
                  </div>
                ) : (
                  <img src={email} alt='' />
                )}
              </NavLink>
            </div>
          </li>
          <li className={styles.icon}>
            <NavLink to={SETTINGS}>
              <img src={settings} alt='' />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserBar;

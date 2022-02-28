import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to='/'>FAMILY DEALERSHIP</NavLink>
      </div>
      <nav className={styles.nav} >
        <ul>
          <li>
            <NavLink to={'/'}>Our Cars</NavLink>
          </li>
          <li>
            <NavLink to={'/my-cars'}>View Your Cars</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/logout'>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;

import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { userActions } from '../../store/user-slice';
import { CUSTOMER_ROLE, DEALER_ROLE } from '../../models/constants';
import familyCar from '../../images/family-car.png';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const [userRole, setUserRole] = useState(CUSTOMER_ROLE);

  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector((state: RootStateOrAny) => state.user);

  useEffect(() => {
    // determine user role to display proper page links
    if (userState.currentUser) {
      let currentUser = JSON.parse(userState.currentUser);
      setUserRole(currentUser.userRole);
    }
  }, [userState.currentUser, userRole]);

  const logoutHandler = () => {
    dispatch(userActions.logout());
    history.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to='/'>
          <img className={styles.logoImage} src={familyCar} alt='' />
        </NavLink>
        <NavLink to='/'>FAMILY DEALERSHIP</NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={'/'}>Our Cars</NavLink>
          </li>
          {userState.isLoggedIn && userRole === DEALER_ROLE && (
            <li>
              <NavLink to={'/edit-dealers-cars'}>Edit Our Lot</NavLink>
            </li>
          )}
          {userState.isLoggedIn && userRole === DEALER_ROLE && (
            <li>
              <NavLink to={'/customer-offers'}>Customer Offers</NavLink>
            </li>
          )}
          {userState.isLoggedIn && userRole === DEALER_ROLE && (
            <li>
              <NavLink to={'/customer-payments'}>Customer Payments</NavLink>
            </li>
          )}
          {!userState.isLoggedIn && (
            <li>
              <NavLink to='/login'>Login / Register</NavLink>
            </li>
          )}
          {userState.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;

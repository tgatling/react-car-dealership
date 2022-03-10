import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { userActions } from '../../store/user-slice';
import {
  CUSTOMER_ROLE,
  DEALER_ROLE,
  HOME_PAGE,
  EDIT_OUR_LOT,
  CUSTOMER_OFFERS,
  CUSTOMER_PAYMENTS,
  LOGIN_REGISTER,
} from '../../models/constants';
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
        <NavLink to={HOME_PAGE}>
          <img className={styles.logoImage} src={familyCar} alt='' />
        </NavLink>
        <NavLink to={HOME_PAGE}>FAMILY DEALERSHIP</NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={HOME_PAGE} activeClassName={styles.active} exact>Our Cars</NavLink>
          </li>
          {userState.isLoggedIn && userRole === DEALER_ROLE && (
            <li>
              <NavLink to={EDIT_OUR_LOT} activeClassName={styles.active}>Edit Our Lot</NavLink>
            </li>
          )}
          {userState.isLoggedIn && userRole === DEALER_ROLE && (
            <li>
              <NavLink to={CUSTOMER_OFFERS} activeClassName={styles.active}>Customer Offers</NavLink>
            </li>
          )}
          {userState.isLoggedIn && userRole === DEALER_ROLE && (
            <li>
              <NavLink to={CUSTOMER_PAYMENTS} activeClassName={styles.active}>Customer Payments</NavLink>
            </li>
          )}
          {!userState.isLoggedIn && (
            <li>
              <NavLink to={LOGIN_REGISTER}>Login / Register</NavLink>
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

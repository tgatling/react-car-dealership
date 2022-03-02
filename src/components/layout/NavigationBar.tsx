import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import styles from './NavigationBar.module.css';
import {useSelector, RootStateOrAny, useDispatch} from 'react-redux';
import {userActions} from '../../store/user-slice';
import familyCar from '../../images/family-car.png';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedIn = useSelector(
    (state: RootStateOrAny) => state.user.isLoggedIn
  );

  const logoutHandler = () =>{
    dispatch(userActions.logout());
    history.push('/');
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImage} src={familyCar} alt=''/>
        <NavLink to='/'>FAMILY DEALERSHIP</NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={'/'}>Our Cars</NavLink>
          </li>
          {loggedIn && (
            <li>
              <NavLink to={'/my-cars'}>View Your Cars</NavLink>
            </li>
          )}
          {!loggedIn && (
            <li>
              <NavLink to='/login'>Login / Register</NavLink>
            </li>
          )}
          {loggedIn && (
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

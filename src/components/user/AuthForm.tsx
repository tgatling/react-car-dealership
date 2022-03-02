import React, { useState } from 'react';
import { User } from '../../models/user';

import userService from '../../services/user.service';
import styles from './AuthForm.module.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { userActions } from '../../store/user-slice';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [httpError, setHttpError] = useState({});
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );

  const dispatch = useDispatch();
  const history = useHistory();

  let user: User;

  const changeForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    user = {
      email,
      password,
    };

    if (isLoginForm) {
      userService
        .login(user)
        .then((result) => {
          dispatch(
            userActions.login({
              token: result.idToken,
              expirationTime: result.expiresIn,
              currentUser: {
                userId: result.localId,
                email: result.email,
                userRole: '',
              },
            })
          );
        })
        .catch((error) => {
          setHttpError({ type: 'LOGIN', error: error.message });
          console.log(httpError);
          return;
        });
    } else {
      userService
        .register(user)
        .then((result) => {
          dispatch(
            userActions.login({
              token: result.idToken,
              expirationTime: result.expiresIn,
              currentUser: {
                userId: result.localId,
                email: result.email,
                userRole: 'CUSTOMER',
              },
            })
          );
        })
        .catch((error) => {
          setHttpError({ type: 'REGISTER', error: error.message });
          console.log(httpError);
          return;
        });

      console.log(currentUser);
    }

    history.push('/');
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1>{isLoginForm ? 'Login' : 'Register'}</h1>
        <form onSubmit={submitHandler} className={styles.form}>
          <div>
            <label>Email:</label>
            <input
              type='text'
              id='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button}>Submit</button>
        </form>
        {httpError && <p>Login unsuccessful. Please try again.</p>}
        {isLoginForm ? (
          <div>
            <p>New user?</p>
          </div>
        ) : (
          <p>Login with existing account</p>
        )}
        <button onClick={changeForm}>Register Now</button>
      </div>
    </section>
  );
};

export default AuthForm;

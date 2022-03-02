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
  const [httpError, setHttpError] = useState('');
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
      setHttpError('');
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
          history.push('/');
        })
        .catch((error) => {
          setHttpError('LOGIN');
          console.log(httpError);
          return;
        });
    } else {
      setHttpError('');
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

          history.push('/');
        })
        .catch((error) => {
          setHttpError('REGISTER');
          console.log(httpError);
          return;
        });

      console.log(currentUser);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1>{isLoginForm ? 'LOGIN' : 'REGISTER'}</h1>
            {httpError && <p className={styles.errorText}>Login unsuccessful. Please try again.</p>}
        <form onSubmit={submitHandler} className={styles.form}>
          <div>
            {/* <label>Email: </label> */}
            <input
              className={styles.emailInput}
              type='text'
              id='text'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            {/* <label>Password:</label> */}
            <input
              className={styles.passwordInput}
              type='password'
              id='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Submit</button>
          </div>
        </form>
        <div className={styles.formChangeContainer}>
          {isLoginForm ? (
            <div>
              <p className={styles.text}>New user?</p>
            </div>
          ) : (
            <p>Login with existing account</p>
          )}
          <button onClick={changeForm} className={styles.formChangeButton}>
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

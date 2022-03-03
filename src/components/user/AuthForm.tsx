import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { User } from '../../models/user';
import { CUSTOMER_ROLE } from '../../models/constants';
import userService from '../../services/user.service';
import { userActions } from '../../store/user-slice';
import styles from './AuthForm.module.css';

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

  useEffect(() => {}, [currentUser]);

  const changeForm = () => {
    setHttpError('');
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
          userService
            .getUserRoles()
            .then((response) => {
              let loadedUsers: User[] = [];
              for (const key in response) {
                console.log(response[key].username);
                loadedUsers.push({
                  email: response[key].email,
                  userId: response[key].userId,
                  userRole: response[key].userRole,
                  username: response[key].username,
                });
              }
              let loadedUser = loadedUsers.find(
                (user) => user.userId === result.localId
              );

              dispatch(
                userActions.login({
                  token: result.idToken,
                  expirationTime: result.expiresIn,
                  currentUser: {
                    userId: result.localId,
                    email: result.email,
                    userRole: loadedUser?.userRole,
                    username: loadedUser?.username,
                  },
                })
              );
            })
            .catch((error) => console.log(error));

          history.push('/');
        })
        .catch((error) => {
          setHttpError(error);
          return;
        });
    } else {
      setHttpError('');
      userService
        .register(user)
        .then(async (result) => {
          await dispatch(
            userActions.login({
              token: result.idToken,
              expirationTime: result.expiresIn,
              currentUser: {
                userId: result.localId,
                email: result.email,
                userRole: CUSTOMER_ROLE,
              },
            })
          );

          userService
            .addUserRole({
              userId: result.localId,
              email: result.email,
              userRole: CUSTOMER_ROLE,
            })
            .then((response) => response)
            .catch((error) => error);

          history.push('/');
        })
        .catch((error) => {
          setHttpError(error);
          return;
        });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1>{isLoginForm ? 'LOGIN' : 'REGISTER'}</h1>
        {/* Container divided into left and right sides */}
        <div className={styles.contentContainer}>
          {/* Left side of content container */}
          <div id='form-container'>
            {httpError && (
              <p className={styles.errorText}>
                Login unsuccessful. Please try again.
              </p>
            )}

            {/* Input and submission */}
            <form onSubmit={submitHandler} className={styles.form}>
              <div>
                <input
                  required
                  className={styles.emailInput}
                  type='email'
                  id='email'
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  required
                  className={styles.passwordInput}
                  type='password'
                  id='password'
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit button for login / registration */}
              <div className={styles.buttonContainer}>
                <button className={styles.button}>Submit</button>
              </div>
            </form>
          </div>

          {/*Right side of content container */}
          <div className={styles.sidePanel}>
            <div className={styles.formChangeContainer}>
              {isLoginForm ? (
                <div>
                  <p className={styles.text}>New user?</p>
                </div>
              ) : (
                <p className={styles.text}>Already have an account?</p>
              )}
              <button onClick={changeForm} className={styles.formChangeButton}>
                {isLoginForm ? 'Register Now' : 'Login with existing account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

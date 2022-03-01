import React, { useState } from 'react';
import { User } from '../../models/user';

import userService from '../../services/user.service';
import styles from './AuthForm.module.css';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [httpError, setHttpError] = useState(null);

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
        .then((result) => console.log(result))
        .catch((error) => setHttpError(error.message));
    } else {
      userService.register(user).then((result) => console.log(result));
    }
  };

  return (
    <section className={styles.section}>
      <h1>{isLoginForm ? 'Login' : 'Register'}</h1>
      <form onSubmit={submitHandler}>
        <label>Email:</label>
        <input
          type='text'
          id='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type='text'
          id='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
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
    </section>
  );
};

export default AuthForm;

import React, { useState } from 'react';
import { User } from '../../models/user';

import userService from '../../services/user.service';
import styles from './AuthForm.module.css';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      userService.login(user);
    } else {
      userService.register(user);
    }

    console.log(user);
    //userService.login(user);
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

import axios from 'axios';

import { User } from '../models/user';

class UserService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  login(user: User) {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => result.data);
  }

  register(user: User) {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => result.data);
  }

  changeEmail(token: string, email: string){
    return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
      JSON.stringify({
        token,
        email,
        returnSecureToken: true,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((result) => result.data);
  }
  
  changePassword(token: string, password: string){
    return axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
      JSON.stringify({
        token,
        password,
        returnSecureToken: true,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((result) => result.data);
  }

  getUserData(token: string) {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({
          token,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => result.data);
  }

  updateUser(user: User, token: string) {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({}),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => result);
  }

  deleteUser(username: string): Promise<null> {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({}),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => null);
  }

}

export default new UserService();
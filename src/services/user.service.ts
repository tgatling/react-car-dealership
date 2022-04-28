import axios from 'axios';
import { User } from '../models/user';

class UserService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  async login(user: User) {
    return await axios
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

  async register(user: User) {
    return await axios
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

  async getUserData(token: string) {
    return await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({
          token,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => result.data);
  }

  async addUserRole(user: User) {
    return await axios
      .post(`${this.URI}/users.json`, user)
      .then((result) => result.data);
  }

  async getUserRoles() {
    return await axios
      .get(`${this.URI}/users.json`)
      .then((result) => result.data);
  }

  async getUser(id: string): Promise<User> {
    return await axios
      .get(`${this.URI}/users/${id}.json`)
      .then((result) => result.data);
  }

  async changeEmail(token: string, email: string) {
    return await axios
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

  async changePassword(token: string, password: string) {
    return await axios
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

  async updateUser(user: User, token: string) {
    return await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({}),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => result);
  }

  async deleteUser(username: string): Promise<null> {
    return await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({}),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((result) => null);
  }
}

export default new UserService();

import axios from 'axios';
import { User } from '../models/user';

class UserService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  getLogin(): Promise<User> {
    return axios.get(this.URI, { withCredentials: true }).then((result) => {
      return result.data;
    });
  }

  login(user: User): Promise<User> {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        user
      )
      .then((result) => result.data)
      .catch((error) => error);
  }

  register(user: User): Promise<User> {
    return axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
        JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
        }),{ headers: {'Content-Type': 'application/json'}}
      )
      .then((result) => result.data)
      .catch((error) => console.log(error.message));
  }

  getUserByName(username: string): Promise<User> {
    return axios
      .get(this.URI + '/' + username, { withCredentials: true })
      .then((result) => result.data)
      .catch((error) => error);
  }

  updateUser(user: User): Promise<null> {
    return axios
      .put(this.URI, user, { withCredentials: true })
      .then((result) => null);
  }

  deleteUser(username: string): Promise<null> {
    return axios
      .delete(this.URI + '/' + username, { withCredentials: true })
      .then((result) => null);
  }

  logout(): Promise<null> {
    return axios
      .delete(this.URI, { withCredentials: true })
      .then((result) => null);
  }
}

export default new UserService();

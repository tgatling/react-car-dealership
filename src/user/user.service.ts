import axios from 'axios';
import {User} from './user';

class UserService{
    private URI: string;
    constructor(){
        this.URI = 'http://localhost:3000/users';
    }

    getLogin(): Promise<User>{
        return axios.get(this.URI, {withCredentials: true}).then((result) => {
            return result.data;
        }).catch((error) => error);
    }

    login(user: User): Promise<User>{
        return axios.post(this.URI, user).then((result) => result.data).catch((error) => error);
    }

    register(user: User): Promise<User>{
        return axios.post(this.URI+'/'+user.username, user, {withCredentials: true}).then((result) => result.data).catch((error) => error);
    }

    getUserByName(username: string): Promise<User>{
        return axios.get(this.URI+'/'+username, {withCredentials: true}).then((result) => result.data).catch((error)=> error);
    }

    updateUser(user: User): Promise<null>{
        return axios.put(this.URI, user, {withCredentials: true}).then(result => null);
    }

    deleteUser(username: string): Promise<null>{
        return axios.delete(this.URI+'/'+username, {withCredentials: true}).then(result => null);
    }

    logout(): Promise<null>{
        return axios.delete(this.URI, {withCredentials: true}).then(result => null);
    }
}

export default new UserService();
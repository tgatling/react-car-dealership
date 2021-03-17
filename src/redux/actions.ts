import {User} from '../user/user';

export enum UserActions{
    GetUser = 'GET_USER',
    ChangeUser = 'CHANGE_USER',
    LoginChange = 'LOGIN_CHANGE',
    RegisterChange = 'REGISTER_CHANGE'
}

export interface AppAction{
    type: string;
    payload: any;
}

export interface UserAction <User> extends AppAction {
    type: UserActions;
    payload: User;
}

export function getUser(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function changeUser(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.ChangeUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}

export function registerAction(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.RegisterChange,
        payload: user
    }
    return action;
}
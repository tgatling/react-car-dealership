import {applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {User} from '../user/user';
import {Car} from '../car/car';
import {AppAction} from './actions';
import reducer from './reducer';

export interface UserState{
    user: User;
    loginUser: User;
    registerUser: User;
}

export interface CarState{
    car: Car;
    cars: Car[];
}

export interface DealershipState extends UserState{}

const store: Store <DealershipState, AppAction> = createStore(reducer, applyMiddleware(thunk));
export default store;
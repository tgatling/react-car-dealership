import * as Actions from './actions';
import * as CarActions from './carActions';
import {DealershipState} from './store';
import {User} from '../user/user';
import {Car} from '../car/car';

export const initialState: DealershipState = {
    user: new User(),
    loginUser: new User(),
    registerUser: new User(),
    car: new Car(),
    cars: [],
}

const reducer = (state: DealershipState = initialState, action: Actions.AppAction): DealershipState => {
    const newState = {...state};

    switch(action.type){
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.ChangeUser:
            newState.user = action.payload as User;
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.UserActions.RegisterChange:
            newState.registerUser = action.payload as User;
            return newState;
        case CarActions.CarActions.GetAllCars:
            newState.cars = action.payload as Car[];
            return newState;
        case CarActions.CarActions.ChangeAllCars:
            newState.cars = action.payload as Car[];
            return newState;
        case CarActions.CarActions.GetCar:
            newState.car = action.payload as Car;
            return newState;
        case CarActions.CarActions.ChangeCar:
            newState.car = action.payload as Car;
            return newState;
        default:
            return state;
    }
}

export default reducer;
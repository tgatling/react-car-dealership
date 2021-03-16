import * as Actions from './actions';
import {DealershipState} from './store';
import {User} from '../user/user';

export const initialState: DealershipState = {
    user: new User,
    loginUser: new User,
    registerUser: new User,
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
        default:
            return state;
    }
}

export default reducer;
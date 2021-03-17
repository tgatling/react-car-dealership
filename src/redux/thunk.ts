import {DealershipState} from '../redux/store';
import {AppAction} from './actions';
import {getAllCars} from './carActions';
import {ThunkAction} from 'redux-thunk';
import carService from '../car/car.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, DealershipState, unknown, AppAction>;

export const thunkGetCars = (owner: string): AppThunk => async dispatch => {
    const asyncResp = await carService.getCars(owner);
    console.log('before thunk dispatch');
    dispatch(getAllCars(asyncResp));
}
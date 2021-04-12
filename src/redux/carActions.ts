import {Car} from '../car/car';
import {AppAction} from './actions';

export enum CarActions{
    GetCar = 'GET_CAR',
    ChangeCar = 'CHANGE_CAR',
    GetAllCars = 'GET_ALL_CARS',
}

export interface CarAction <Car> extends AppAction {
    type: CarActions;
    payload: Car | Car[];
}

export function getAllCars(cars: Car[]): CarAction<Car[]> {
    const action: CarAction<Car[]> = {
        type: CarActions.GetAllCars,
        payload: cars
    }
    return action;
}

export function changeCar(car: Car[]): CarAction<Car> {
    const action: CarAction<Car> = {
        type: CarActions.ChangeCar,
        payload: car
    }
    return action;
}

export function getCar(car: Car): CarAction<Car> {
    const action: CarAction<Car> = {
        type: CarActions.GetCar,
        payload: car
    }
    return action;
}
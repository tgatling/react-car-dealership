import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Car} from '../models/car';

const carSlice = createSlice({
    name: 'car',
    initialState: {
        cars: [] as Car[],
    },
    reducers: {
        setCars(state, action: PayloadAction<{cars: Car[]}>){
            state.cars = action.payload.cars;
        },
        addCarToDealership(state, action: PayloadAction<{car: Car}>){
          state.cars.push(action.payload.car)
        },
        removeCarFromDealership(state, action: PayloadAction<{carId: string}>){
            const newCars = state.cars.filter(car => car.carId !== action.payload.carId);
            state.cars = newCars;
        },
        editCar(state, action){

        }
    }
});

export const carActions = carSlice.actions;

export default carSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../models/car';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    cars: [] as Car[],
  },
  reducers: {
    setCars(state, action: PayloadAction<{ cars: Car[] }>) {
      state.cars = action.payload.cars;
    },
    addCarToDealership(state, action: PayloadAction<{ car: Car }>) {
      state.cars.push(action.payload.car);
    },
    removeCarFromDealership(state, action: PayloadAction<{ carId: string }>) {
      const newCars = state.cars.filter(
        (car) => car.carId !== action.payload.carId
      );
      state.cars = newCars;
    },
    editCar(state, action: PayloadAction<{ id: string; car: Car }>) {
      const id = action.payload.id;
      let existingCar = state.cars.find((car) => car.carId === id);

      let newCars = state.cars.filter((car) => car.carId !== id);
      if (existingCar) {
        newCars.push(action.payload.car);
      }

      state.cars = newCars;
    },
  },
});

export const carActions = carSlice.actions;

export default carSlice.reducer;

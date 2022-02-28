import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
    name: 'car',
    initialState: {
        
    },
    reducers: {
        addCarToDealership(){

        },
        removeCarFromDealership(){

        },
        editCar(){

        },
    }
});

export const carActions = carSlice.actions;

export default carSlice.reducer;
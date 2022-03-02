import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import carReducer from './car-slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        car: carReducer,
    },
});

export default store;
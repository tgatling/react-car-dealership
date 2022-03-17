import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import carReducer from './car-slice';
import offerReducer from './offer-slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        car: carReducer,
        offer: offerReducer,
    },
});

export default store;
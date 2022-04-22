import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import carReducer from './car-slice';
import offerReducer from './offer-slice';
import messageReducer from './message-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
    offer: offerReducer,
    message: messageReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';

import messageReducer from './message-slice';
import offerReducer from './offer-slice';
import userReducer from './user-slice';
import carReducer from './car-slice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    offer: offerReducer,
    user: userReducer,
    car: carReducer,
  },
});

export default store;

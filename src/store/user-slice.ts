import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') ? true: false,
    token: localStorage.getItem('token'),
    expirationTime: localStorage.getItem('expirationTime'),
    userType: '',
  },
  reducers: {
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
      localStorage.clear();
    },
    login(state, action) {
      state.token = action.payload.token;
      if (state.token) {
        localStorage.setItem('token', state.token);
      }
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'LOGGED_IN');

      localStorage.setItem('expirationTime', action.payload.expirationTime);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

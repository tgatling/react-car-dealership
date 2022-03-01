import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('isLoggedIn') ? true: false,
    expirationTime: localStorage.getItem('expirationTime'),
    currentUser: localStorage.getItem('currentUser')
  },
  reducers: {
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
      state.expirationTime = '';
      state.currentUser = '';
      localStorage.clear();
    },
    login(state, action) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
      state.currentUser = JSON.stringify(action.payload.currentUser);
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'LOGGED_IN');

      if (state.token) {
        localStorage.setItem('token', state.token);
      }
      
      if(state.expirationTime){
        localStorage.setItem('expirationTime', state.expirationTime);
      }

      localStorage.setItem('user', state.currentUser);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const LOGGED_IN_STATE = 'LOGGED_IN';
const LOGGED_OUT_STATE = 'LOGGED_OUT';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: LOGGED_OUT_STATE,
        token: '',
        expirationTime: '',
        userType: '',
    },
    reducers: {
        logout(state){
            state.token = '';
            state.isLoggedIn = LOGGED_OUT_STATE;
        },
        login(state, action){
            state.token = action.payload.token;
            localStorage.setItem('token', state.token);
            state.isLoggedIn = LOGGED_IN_STATE;
            localStorage.setItem('isLoggedIn', state.isLoggedIn);
            localStorage.setItem('expirationTime', action.payload.expirationTime)
        },
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
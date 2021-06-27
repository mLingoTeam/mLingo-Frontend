import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserState {
    username: string;
    token: string;
}

const initialState: UserState = {
    username: '',
    token: ''
};

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUsername: (state, action) => {
            state.username = action.payload;
        },
        changeToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const { changeUsername, changeToken } = counterSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;
export const selectToken = (state: RootState) => state.user.token;

export default counterSlice.reducer;

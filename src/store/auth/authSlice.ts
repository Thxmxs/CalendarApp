import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/IAuth';

interface IinitialState{
    status:'checking' | 'authenticated' | 'not-authenticated';
    user:IUser | undefined,
    errorMessage:string | undefined
}

const initialState : IinitialState = {
    status:'not-authenticated',
    user:undefined,
    errorMessage:undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        onChecking: (state) =>{
            state.status = 'checking';
            state.user = undefined;
            state.errorMessage = undefined;
        },
        onLogin: (state, {payload}: PayloadAction<IUser>) =>{
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload}: PayloadAction<string | undefined>) =>{
            state.status = 'not-authenticated';
            state.user = undefined;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) =>{
            state.errorMessage = undefined;
        }
     },
});

export const {onChecking, onLogin, onLogout, clearErrorMessage} = authSlice.actions;
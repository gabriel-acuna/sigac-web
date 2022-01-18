import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import { API } from '../services/api';
import Axios from 'axios';

export const loadAccounts = createAsyncThunk(
    'accounts/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/accounts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            throw error.response.detail
        }
    }
)
export const createAccount = createAsyncThunk(
    'accounts/post', async (data, { getState }) => {
        let token
        try {
            token = getState().user.user.jwt.token
        } catch (e) {
            throw e
        }
        try {
            let response = await Axios.post(
                `${API}/accounts`,
                data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

           
            return response.data
            

        } catch (err) {

            throw err.response.data.detail

        }
    },


);

export const updateAccount = createAsyncThunk(
    'accounts/put', async (data, { getState }) => {
        let token
        try {
            token = getState().user.user.jwt.token
        } catch (e) {
            throw e
        }
        try {
            let response = await Axios.put(
                `${API}/accounts`,
                data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

           
            return response.data
            

        } catch (err) {

            throw err.response.data.detail

        }
    },


);

let accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        data: {
            accounts: []

        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data.accounts = []
        }

    },
    extraReducers: {
        [loadAccounts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loadAccounts.fulfilled]: (state, action) => {
            state.data.accounts = action.payload
            state.status = 'success'
        },
        [loadAccounts.rejected]: (state, action) => {
            state.status = 'failed'
        }

    }
})

export const { clearData } = accountSlice.actions;
export default accountSlice.reducer;
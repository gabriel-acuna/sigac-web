import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import { API } from '../services/api';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';



export const signIn = createAsyncThunk(
    'user/signIn', async ({ credentials }) => {
        try {
            let response = await Axios.post(
                `${API}/login`,
                credentials
            );

            if (response.statusText === 'OK') {
                return response.data
            }

        } catch (err) {

            throw err.response.data.detail

        }
    },


);

let userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: ''

    },
    reducers: {

        logOut: (state) => {
            state.user = null
        }

    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signIn.fulfilled]: (state, action) => {
            let { token, type } = action.payload
            let userData = jwtDecode(token)
            state.user = {
                jwt: {
                    token,
                    type,
                    expires: userData.expires
                },
                userInfo: userData.user
            }


            state.status = 'success'
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'failed'
        }

    }
})

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
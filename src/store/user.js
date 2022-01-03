import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import { API } from '../services/api';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import axios from 'axios';



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

export const changePassword = createAsyncThunk(
    'user/changePassword', async (data, { getState }) => {
        let token, email;
        try {
            token = getState().user.user.jwt.token
            email = getState().user.user.userInfo.email
        } catch (e) {
            throw e;
        }
        if (data.pass1 !== data.pass2) {
            throw new Error("Las contraseñas no coinciden")
        }
        try {
            let response = await axios.put(`${API}/change-password`, {
                email: email,
                clave_actual: data.current_pass,
                clave_nueva: data.pass1

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            throw err.response.data.detail
        }
    }
)

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
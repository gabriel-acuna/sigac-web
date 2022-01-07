import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import { API } from '../services/api';
import Axios from 'axios';

export const loadRoles = createAsyncThunk(
    'roles/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/roles`,
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

export const loadRol = createAsyncThunk(
    'role/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/roles/${id}`,
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


let rolSlice = createSlice({
    name: 'rol',
    initialState: {
        roles: null,
        status: ''

    },
    reducers: {

        cleaeData: (state) => {
            state.roles = null
        }

    },
    extraReducers: {
        [loadRoles.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loadRoles.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'success'
        },
        [loadRoles.rejected]: (state, action) => {
            state.status = 'failed'
        }

    }
})

export const { logOut } = rolSlice.actions;
export default rolSlice.reducer;
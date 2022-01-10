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

export const postRoles = createAsyncThunk(
    'roles/post',
    async ( data, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
        
            let response = await Axios.post(`${API}/roles`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putRoles = createAsyncThunk(
    'roles/put',
    async (data, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/roles/`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }
)

export const deleteRoles = createAsyncThunk(
    'roles/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/roles/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            throw error.response
        }

    }
)


let rolSlice = createSlice({
    name: 'rol',
    initialState: {
        data: {
            roles: []

        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data.roles = []
        }

    },
    extraReducers: {
        [loadRoles.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loadRoles.fulfilled]: (state, action) => {
            state.data.roles = action.payload
            state.status = 'success'
        },
        [loadRoles.rejected]: (state, action) => {
            state.status = 'failed'
        }

    }
})

export const { clearData } = rolSlice.actions;
export default rolSlice.reducer;
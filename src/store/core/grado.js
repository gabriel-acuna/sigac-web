import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadGrados = createAsyncThunk(
    'grados/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/grados`,
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

export const loadGrado = createAsyncThunk(
    'grado/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/grados/${id}`,
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

export const postGrados = createAsyncThunk(
    'grados/post',
    async (grado, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/grados`, grado,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err =error.response.data.detail[0].msg
            if(error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw  err
        }

    }

)

export const putGrados = createAsyncThunk(
    'grados/put',
    async (grado, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/grados`, grado,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err =error.response.data.detail[0].msg
            if(error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw  err
        }

    }
)

export const deleteGrados = createAsyncThunk(
    'grados/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/grados/${id}`,
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

let gradosSlice = createSlice({
    name: 'grados',
    initialState: {
        data: {
            grados: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                grados: []
               
            }
        }

    },
    extraReducers: {
        [loadGrados.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                    grados: action.payload
                }

        }


    }
}
)

export const { clearData } = gradosSlice.actions;
export default gradosSlice.reducer;
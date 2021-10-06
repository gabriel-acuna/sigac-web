import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadCapacitaciones = createAsyncThunk(
    'capacitaciones/load',
    async ( id_persona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/capacitaciones/persona/${id_persona}`,
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

export const loadCapacitacion = createAsyncThunk(
    'capacitacion/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/capacitaciones/${id}`,
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

export const postCapacitaciones = createAsyncThunk(
    'capacitaciones/post',
    async ( capacitacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/capacitaciones`, capacitacion,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            console.log(err);
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putCapacitaciones = createAsyncThunk(
    'capacitaciones/put',
    async (capacitacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/capacitaciones/${capacitacion.id}`, capacitacion.capacitacion,
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

export const deleteCapacitaciones = createAsyncThunk(
    'capacitaciones/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/capacitaciones/${id}`,
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

let capcitacionesSlice = createSlice({
    name: 'capacitaciones',
    initialState: {
        data: {
            capacitaciones: []  
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                capacitaciones: []
            }
        }

    },
    extraReducers: {
        [loadCapacitaciones.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                capacitaciones: action.payload
            }
        }


    }
}
)

export const { clearData } = capcitacionesSlice.actions;
export default capcitacionesSlice.reducer;
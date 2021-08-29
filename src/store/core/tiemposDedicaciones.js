import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadTiemposDedicaionesProfesores = createAsyncThunk(
    'tiempos-dedicaciones/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tiempos-dedicaciones-profesores`,
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

export const loadTiempoDedicacionProfesores = createAsyncThunk(
    'tiempo-dedicacion/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tiempos-dedicaciones-profesores/${id}`,
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

export const postTiemposDedicacionesProfesores = createAsyncThunk(
    'tiempos-dedicaciones/post',
    async (tiempoDedicacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/tiempos-dedicaciones-profesores`, tiempoDedicacion,
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

export const putTiemposDedicacionesProfesores = createAsyncThunk(
    'tiempos-dedicaciones/put',
    async (tiempoDedicacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/tiempos-dedicaciones-profesores`, tiempoDedicacion,
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

export const deleteTiemposDedicacionesProfesores = createAsyncThunk(
    'tiempos-dedicaciones/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/tiempos-dedicaciones-profesores/${id}`,
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

let tiemposDedicacionesProfesoresSlice = createSlice({
    name: 'tiemposDedicaciones',
    initialState: {
        data: {
            tiemposDedicaciones: [],
            tiempoDedicacion: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                tiemposDedicaciones: [],
                tiempoDedicacion: null
            }
        }

    },
    extraReducers: {
        [loadTiemposDedicaionesProfesores.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tiemposDedicaciones: action.payload
            }

        },
        [loadTiempoDedicacionProfesores.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tiempoDedicacion: action.payload
            }

        }


    }
}
)

export const { clearData } = tiemposDedicacionesProfesoresSlice.actions;
export default tiemposDedicacionesProfesoresSlice.reducer;
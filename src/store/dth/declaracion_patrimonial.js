import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadDeclaraciones = createAsyncThunk(
    'declaraciones/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/declaraciones-patrimoniales`,
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

export const loadDeclaracionesPersona = createAsyncThunk(
    'declaraciones/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/declaraciones-patrimoniales/personal/${id}`,
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

export const loadDeclaracion = createAsyncThunk(
    'declaracion/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/declaraciones-patrimoniales/${id}`,
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

export const postDeclaraciones = createAsyncThunk(
    'declaraciones/post',
    async (declaracion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/declaraciones-patrimoniales`,
                { persona: declaracion.persona, tipo_declaracion: declaracion.tipoDeclaracion, numero_declaracion: declaracion.numeroDeclaracion, fecha_presentacion: declaracion.fechaPresentacion },
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

export const putDeclaraciones = createAsyncThunk(
    'declaraciones/put',
    async (declaracion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/declaraciones-patrimoniales`,
                { id: declaracion.id, tipo_declaracion: declaracion.tipoDeclaracion, numero_declaracion: declaracion.numeroDeclaracion, fecha_presentacion: declaracion.fechaPresentacion },
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

export const deleteDeclaraciones = createAsyncThunk(
    'declaraciones/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/declaraciones-patrimoniales/${id}`,
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

let decalacionesSlice = createSlice({
    name: 'declaraciones',
    initialState: {
        data: {
            declaraciones: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                declaraciones: []

            }
        }

    },
    extraReducers: {
        [loadDeclaraciones.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                declaraciones: action.payload
            }

        },
        [loadDeclaracionesPersona.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                declaraciones: action.payload
            }

        }


    }
}
)

export const { clearData } = decalacionesSlice.actions;
export default decalacionesSlice.reducer;
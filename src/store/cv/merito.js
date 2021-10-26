import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadMeritos = createAsyncThunk(
    'meritos/load',
    async ( id_persona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/meritos-distinciones/persona/${id_persona}`,
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

export const loadMerito = createAsyncThunk(
    'merito/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/meritos-distinciones/${id}`,
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

export const postMeritos = createAsyncThunk(
    'meritos/post',
    async ( merito, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
        
            let data = {
                id_persona: merito.id_persona,
                titulo: merito.titulo.toUpperCase(),
                institucion_auspiciante: merito.institucionAuspiciante.toUpperCase(),
                funcion: merito.funcion.toUpperCase(),
                fecha_inicio: merito.inicio,
                fecha_fin: merito.fin
            }
            let response = await Axios.post(`${API}/meritos-distinciones`, data,
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

export const putMeritos = createAsyncThunk(
    'meritos/put',
    async (merito, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
           
            let data = {
                id: merito.id,
                titulo: merito.titulo.toUpperCase(),
                institucion_auspiciante: merito.institucionAuspiciante.toUpperCase(),
                funcion: merito.funcion.toUpperCase(),
                fecha_inicio: merito.inicio,
                fecha_fin: merito.fin
            }
            let response = await Axios.put(`${API}/meritos-distinciones/`, data,
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

export const deleteMeritos = createAsyncThunk(
    'meritos/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/meritos-distinciones/${id}`,
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

let meritosSlice = createSlice({
    name: 'meritos',
    initialState: {
        data: {
            meritos: []  
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                meritos: []
            }
        }

    },
    extraReducers: {
        [loadMeritos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                meritos: action.payload
            }
        }


    }
}
)

export const { clearData } = meritosSlice.actions;
export default meritosSlice.reducer;
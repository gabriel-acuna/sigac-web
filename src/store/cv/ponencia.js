import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadPonencias = createAsyncThunk(
    'ponencias/load',
    async ( id_persona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/ponencias/persona/${id_persona}`,
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

export const loadPonencia = createAsyncThunk(
    'ponencia/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/ponencias/${id}`,
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

export const postPonencias = createAsyncThunk(
    'ponencias/post',
    async ( ponencia, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let fechaEvento= new Date(ponencia.fecha)
            let data = {
                id_persona: ponencia.id_persona,
                tema: ponencia.tema,
                institucion_organizadora: ponencia.institucion_organizadora,
                evento: ponencia.evento,
                lugar: ponencia.lugar,
                fecha: new Date(fechaEvento.setDate(fechaEvento.getDate()+1)).toISOString().slice(0, 10)
            }
            let response = await Axios.post(`${API}/ponencias`, data,
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

export const putPonencias = createAsyncThunk(
    'ponencias/put',
    async (ponencia, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let fechaEvento= new Date(ponencia.ponencia.fecha)
            let data = {
                tema: ponencia.ponencia.tema,
                institucion_organizadora: ponencia.ponencia.institucion_organizadora,
                evento: ponencia.ponencia.evento,
                lugar: ponencia.ponencia.lugar,
                fecha: new Date(fechaEvento.setDate(fechaEvento.getDate()+1)).toISOString().slice(0, 10)
            }
            let response = await Axios.put(`${API}/ponencias/${ponencia.id}`, data,
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

export const deletePonencia = createAsyncThunk(
    'ponencias/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/ponencias/${id}`,
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

let ponenciasSlice = createSlice({
    name: 'ponencias',
    initialState: {
        data: {
            ponencias: []  
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                ponencias: []
            }
        }

    },
    extraReducers: {
        [loadPonencias.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                ponencias: action.payload
            }
        }


    }
}
)

export const { clearData } = ponenciasSlice.actions;
export default ponenciasSlice.reducer;
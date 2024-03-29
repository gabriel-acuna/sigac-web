import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadExperienciaLaboral = createAsyncThunk(
    'experiencia-laboral/load',
    async (id_persona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/experiencia-laboral/persona/${id_persona}`,
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

export const loadExperiencia = createAsyncThunk(
    'experiencia/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/experiencia-laboral/${id}`,
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

export const postExperienciaLaboral = createAsyncThunk(
    'experiencia-laboral/post',
    async (experiencia, { getState }) => {
        console.log(experiencia);
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            
            let fechaInicio = new Date(experiencia.inicio)
            let fechaFin = (experiencia.fin !== null && experiencia.fin !== '') ? new Date(experiencia.fin) : ''
            let data = {
                id_persona: experiencia.id_persona,
                empresa: experiencia.empresa.toUpperCase(),
                unidad_administrativa: experiencia.unidadAdministrativa.toUpperCase(),
                lugar: experiencia.lugar.toUpperCase(),
                cargo: experiencia.cargo.toUpperCase(),
                inicio: new Date(fechaInicio.setDate(fechaInicio.getDate() + 1)).toISOString().slice(0, 10),
                motivo_ingreso: experiencia.motivoIngreso,
                fin: fechaFin !== '' ? new Date(fechaFin.setDate(fechaFin.getDate() + 1)).toISOString().slice(0, 10) : null,
                motivo_salida: experiencia?.motivoSalida ? experiencia.motivoSalida.toUpperCase(): null
            }
            let response = await Axios.post(`${API}/experiencia-laboral`, data,
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

export const putExperienciaLaboral = createAsyncThunk(
    'experiencia-laboral/put',
    async (experiencia, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let fechaInicio = new Date(experiencia.inicio)
            let fechaFin = (experiencia.fin !== null && experiencia.fin !== '') ? new Date(experiencia.fin) : ''
            let data = {
                id: experiencia.id,
                empresa: experiencia.empresa.toUpperCase(),
                unidad_administrativa: experiencia.unidadAdministrativa.toUpperCase(),
                lugar: experiencia.lugar.toUpperCase(),
                cargo: experiencia.cargo.toUpperCase(),
                inicio: new Date(fechaInicio.setDate(fechaInicio.getDate() + 1)).toISOString().slice(0, 10),
                motivo_ingreso: experiencia.motivoIngreso,
                fin: fechaFin !== '' ? new Date(fechaFin.setDate(fechaFin.getDate() + 1)).toISOString().slice(0, 10) : null,
                motivo_salida: experiencia?.motivoSalida ? experiencia.motivoSalida.toUpperCase(): null
            }
            let response = await Axios.put(`${API}/experiencia-laboral/`, data,
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

export const deleteExperienciaLaboral = createAsyncThunk(
    'experiencia-laboral/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/experiencia-laboral/${id}`,
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

let experienciaLaboralSlice = createSlice({
    name: 'experienciaLaboral',
    initialState: {
        data: {
            experiencias: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                experiencias: []
            }
        }

    },
    extraReducers: {
        [loadExperienciaLaboral.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                experiencias: action.payload
            }
        }


    }
}
)

export const { clearData } = experienciaLaboralSlice.actions;
export default experienciaLaboralSlice.reducer;
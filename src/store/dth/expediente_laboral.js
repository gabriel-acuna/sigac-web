import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadExpedienteLaboral = createAsyncThunk(
    'expediente-laboral/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/expediente-laboral/${id}`,
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

export const loadItemDetalle = createAsyncThunk(
    'detalle-expediente/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/expediente-laboral/detalle/${id}`,
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

export const postDetalleExpedienteProfesor = createAsyncThunk(
    'expediente-laboral-profesor/post',
    async ( detalleExpediente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/expediente-laboral/profesor/${detalleExpediente.id_persona}`, detalleExpediente.detalle,
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

export const postDetalleExpedienteFuncionario = createAsyncThunk(
    'expediente-laboral-funcionario/post',
    async ( detalleExpediente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/expediente-laboral/funcionario/${detalleExpediente.id_persona}`, detalleExpediente.detalle,
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

export const putDetalleExpediente = createAsyncThunk(
    'expediente-laboral/put',
    async (detalleExpediente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/expediente-laboral`, detalleExpediente,
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

export const deleteItemDetalle = createAsyncThunk(
    'expediente-laboral/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/expediente-laboral/${id}`,
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

let expedienteLaboralSlice = createSlice({
    name: 'expedienteLaboral',
    initialState: {
        data: {
            expediente: {
                id: null,
                id_persona: null,
                fecha_ingreso:'',
                detalle:[]
            }
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                expediente: {
                    id: null,
                    id_persona: null,
                    fecha_ingreso:'',
                    detalle:[]
                }
            }
        }

    },
    extraReducers: {
        [loadExpedienteLaboral.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data.expediente = {
                    id: action.payload.id,
                    id_persona: action.payload.id_persona,
                    fecha_ingreso: action.payload.fecha_ingreso,
                    detalle:action.payload.detalle
                }
        }


    }
}
)

export const { clearData } = expedienteLaboralSlice.actions;
export default expedienteLaboralSlice.reducer;
import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadTiposDocumentos = createAsyncThunk(
    'tipos-documentos/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-documentos`,
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

export const loadTipoDocumento = createAsyncThunk(
    'tipo-documento/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-documentos/${id}`,
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

export const postTiposDocumentos = createAsyncThunk(
    'tipos-documentos/post',
    async (tipoDocumento, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/tipos-documentos`, tipoDocumento,
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

export const putTiposDocumentos = createAsyncThunk(
    'tipos-documentos/put',
    async (tipoDocumento, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/tipos-documentos`, tipoDocumento,
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

export const deleteTiposDocumentos = createAsyncThunk(
    'tipos-documentos/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/tipos-documentos/${id}`,
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

let tiposDocumentosSlice = createSlice({
    name: 'tiposDocumentos',
    initialState: {
        data: {
            tiposDocumentos: [],
            tipoDocumento: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                tiposDocumentos: [],
                tipoDocumento: null
            }
        }

    },
    extraReducers: {
        [loadTiposDocumentos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                    tiposDocumentos: action.payload
                }

        },
        [loadTipoDocumento.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                    tipoDocumento: action.payload
                }

        }


    }
}
)

export const { clearData } = tiposDocumentosSlice.actions;
export default tiposDocumentosSlice.reducer;
import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadCamposDetallados = createAsyncThunk(
    'campos-detallados/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/campo-detallado`,
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

export const loadCampoDetallado = createAsyncThunk(
    'campo-detallado/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/campo-detallado/${id}`,
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

export const postCampoDetallado = createAsyncThunk(
    'campos-detallados/post',
    async (campo, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/campo-detallado`, campo,
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

export const putCamposDetallados = createAsyncThunk(
    'camposDetallados/put',
    async (campo, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/campo-detallado`, campo,
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

export const deleteCamposDetallados = createAsyncThunk(
    'campos-detallados/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/campo-detallado/${id}`,
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

let camposDetalladosSlice = createSlice({
    name: 'camposDetallados',
    initialState: {
        data: {
            campos: []
        
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                campos: []
               
            }
        }

    },
    extraReducers: {
        [loadCamposDetallados.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                    campos: action.payload
                }

        }


    }
}
)

export const { clearData } = camposDetalladosSlice.actions;
export default camposDetalladosSlice.reducer;
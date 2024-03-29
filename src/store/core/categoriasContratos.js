import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadCategoriasContratoProfesores = createAsyncThunk(
    'categorias-contrato/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/categorias-contrato-profesores`,
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

export const loadCategoriaContratoProfesores = createAsyncThunk(
    'categoria-contrato/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/categorias-contrato-profesores/${id}`,
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

export const postCategoriasContratoProfesores = createAsyncThunk(
    'categorias-contrato/post',
    async (categoriaContrato, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/categorias-contrato-profesores`, categoriaContrato,
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

export const putCategoriasContratoProfesores = createAsyncThunk(
    'categorias-contrato/put',
    async (categoriaContrato, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/categorias-contrato-profesores`, categoriaContrato,
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

export const deleteCategoriasContratoProfesores = createAsyncThunk(
    'categorias-contrato/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/categorias-contrato-profesores/${id}`,
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

let categoriasContratoProfesoresSlice = createSlice({
    name: 'categoriasContrato',
    initialState: {
        data: {
            categoriasContrato: []  
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                categoriasContrato: []
            }
        }

    },
    extraReducers: {
        [loadCategoriasContratoProfesores.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                categoriasContrato: action.payload
            }
        }


    }
}
)

export const { clearData } = categoriasContratoProfesoresSlice.actions;
export default categoriasContratoProfesoresSlice.reducer;
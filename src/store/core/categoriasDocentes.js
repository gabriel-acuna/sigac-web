import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadCategoriasDocentesLOSEP = createAsyncThunk(
    'categorias-docentes/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/categorias-docentes-losep`,
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

export const loadCategoriaDocenteLOSEP = createAsyncThunk(
    'categoria-decente/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/categorias-docentes-losep/${id}`,
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

export const postCategoriasDocentesLOSEP = createAsyncThunk(
    'categorias-docentes/post',
    async (categoriaDocente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/categorias-docentes-losep`, categoriaDocente,
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

export const putCategoriasDocentesLOSEP = createAsyncThunk(
    'categorias-docentes/put',
    async (categoriaDocente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/categorias-docentes-losep`, categoriaDocente,
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

export const deleteCategoriasDocentesLOSEP = createAsyncThunk(
    'categorias-docentes/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/categorias-docentes-losep/${id}`,
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

let categoriasDocentesLOSEPSlice = createSlice({
    name: 'categoriasDocentes',
    initialState: {
        data: {
            categoriasDocentes: []
           
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                categoriasDocentes: []
                
            }
        }

    },
    extraReducers: {
        [loadCategoriasDocentesLOSEP.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                categoriasDocentes: action.payload
            }

        }


    }
}
)

export const { clearData } = categoriasDocentesLOSEPSlice.actions;
export default categoriasDocentesLOSEPSlice.reducer;
import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadTiposFuncionarios = createAsyncThunk(
    'tipos-funcionarios/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-funcionarios`,
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

export const loadTipoFuncionario = createAsyncThunk(
    'tipo-funcionario/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-funcionarios/${id}`,
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

export const postTiposFuncionarios = createAsyncThunk(
    'tipos-funcionarios/post',
    async (tipoFuncionario, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/tipos-funcionarios`, tipoFuncionario,
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

export const putTiposFuncionarios = createAsyncThunk(
    'tipos-funcionarios/put',
    async (tipoFuncionario, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/tipos-funcionarios`, tipoFuncionario,
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

export const deleteTiposFuncionarios = createAsyncThunk(
    'tipos-funcionarios/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/tipos-funcionarios/${id}`,
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

let tiposFuncionariosSlice = createSlice({
    name: 'tiposFuncionarios',
    initialState: {
        data: {
            tiposFuncionarios: [],
            tipoFuncionario: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                tiposFuncionarios: [],
                tipoFuncionario: null
            }
        }

    },
    extraReducers: {
        [loadTiposFuncionarios.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tiposFuncionarios: action.payload
            }

        },
        [loadTipoFuncionario.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tipoFuncionario: action.payload
            }

        }


    }
}
)

export const { clearData } = tiposFuncionariosSlice.actions;
export default tiposFuncionariosSlice.reducer;
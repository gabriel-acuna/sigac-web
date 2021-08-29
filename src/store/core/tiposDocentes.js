import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadTiposDocentesLOES = createAsyncThunk(
    'tipos-docentes/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-docentes-loes`,
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

export const loadTipoDocente = createAsyncThunk(
    'tipo-docente/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-docentes-loes/${id}`,
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

export const postTiposDocentesLOES = createAsyncThunk(
    'tipos-docentes/post',
    async (tipoDocente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/tipos-docentes-loes`, tipoDocente,
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

export const putTiposDocentes = createAsyncThunk(
    'tipos-docentes/put',
    async (tipoDocente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/tipos-docentes-loes`, tipoDocente,
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

export const deleteTiposDocentes = createAsyncThunk(
    'tipos-docentes/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/tipos-docentes-loes/${id}`,
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

let tiposDocentesSlice = createSlice({
    name: 'tiposDocentes',
    initialState: {
        data: {
            tiposDocentes: [],
            tipoDocente: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                tiposDocentes: [],
                tipoDocente: null
            }
        }

    },
    extraReducers: {
        [loadTiposDocentesLOES.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tiposDocentes: action.payload
            }

        },
        [loadTipoDocente.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tipoDocente: action.payload
            }

        }


    }
}
)

export const { clearData } = tiposDocentesSlice.actions;
export default tiposDocentesSlice.reducer;
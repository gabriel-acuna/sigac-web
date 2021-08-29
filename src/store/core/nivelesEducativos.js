import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadNivelesEducativos = createAsyncThunk(
    'niveles-educativos/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/niveles-educativos`,
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

export const loadNivelEducativo = createAsyncThunk(
    'nivel-educativo/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/niveles-educativos/${id}`,
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

export const postNivelesEducativos = createAsyncThunk(
    'niveles-educativos/post',
    async (nivelEducativo, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/niveles-educativos`, nivelEducativo,
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

export const putNivelesEducativos = createAsyncThunk(
    'niveles-educativos/put',
    async (nivelEducativo, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/niveles-educativos`, nivelEducativo,
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

export const deleteNivelesEducativos = createAsyncThunk(
    'niveles-educativos/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/niveles-educativos/${id}`,
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

let nivelesEducativosSlice = createSlice({
    name: 'nivelesEducativos',
    initialState: {
        data: {
            nivelesEducativos: [],
            nivelEducativo: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                nivelesEducativos: [],
                nivelEducativo: null
            }
        }

    },
    extraReducers: {
        [loadNivelesEducativos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                nivelesEducativos: action.payload
            }

        },
        [loadNivelEducativo.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                nivelEducativo: action.payload
            }

        }


    }
}
)

export const { clearData } = nivelesEducativosSlice.actions;
export default nivelesEducativosSlice.reducer;
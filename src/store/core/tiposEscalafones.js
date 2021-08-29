import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadTiposEscalafonesNombramientos = createAsyncThunk(
    'tipos-escalafones/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-escalafones-nombramientos`,
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

export const loadTipoEscalafon = createAsyncThunk(
    'tipo-escalafon/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/tipos-escalafones-nombramientos/${id}`,
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

export const postTiposEscalafonesNombramientos = createAsyncThunk(
    'tipos-escalafones/post',
    async (tipoEscalafon, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/tipos-escalafones-nombramientos`, tipoEscalafon,
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

export const putTiposEscalafonesNombramientos = createAsyncThunk(
    'tipos-escalafones/put',
    async (tipoEscalafon, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/tipos-escalafones-nombramientos`, tipoEscalafon,
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

export const deleteTiposEscalafonesNombramientos = createAsyncThunk(
    'tipos-escalafones/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/tipos-escalafones-nombramientos/${id}`,
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

let TiposEscalafonesNombramientosSlice = createSlice({
    name: 'tiposEscalafonesNombramientos',
    initialState: {
        data: {
            tipoEscalafones: [],
            tipoEscalafon: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                tipoEscalafones: [],
                tipoEscalafon: null
            }
        }

    },
    extraReducers: {
        [loadTiposEscalafonesNombramientos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tipoEscalafones: action.payload
            }

        },
        [loadTipoEscalafon.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                tipoEscalafon: action.payload
            }

        }


    }
}
)

export const { clearData } = TiposEscalafonesNombramientosSlice.actions;
export default TiposEscalafonesNombramientosSlice.reducer;
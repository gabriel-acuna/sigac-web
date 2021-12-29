import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'


export const loadSustitutosPersonal = createAsyncThunk(
    'sustitutos/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/sustitutos/personal/${id}`,
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


export const loadSustituto = createAsyncThunk(
    'sustituto/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/sustitutos/${id}`,
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

export const postSutitutos = createAsyncThunk(
    'sustitutos/post',
    async (sustituto, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.post(`${API}/sustitutos/`, {
                id_persona: sustituto.idPersona,
                tipo_sustituto: sustituto.tipoSustituto,
                apellidos: sustituto.apellidos.toUpperCase(),
                nombres: sustituto.nombres.toUpperCase(),
                numero_carnet: sustituto.numeroCarnet.toUpperCase(),
                desde: sustituto.desde,
                hasta: sustituto.hasta
            },
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

export const putSutitutos = createAsyncThunk(
    'sustitutos/put',
    async (sustituto, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.put(`${API}/sustitutos/`,{
                id: sustituto.id,
                tipo_sustituto: sustituto.tipoSustituto,
                apellidos: sustituto.apellidos.toUpperCase(),
                nombres: sustituto.nombres.toUpperCase(),
                numero_carnet: sustituto.numeroCarnet.toUpperCase(),
                desde: sustituto.desde,
                hasta: sustituto.hasta
            },
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

export const deleteSustitutos = createAsyncThunk(
    'sustitutos/detele',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.delete(`${API}/sustitutos/${id}`,
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

let sustitutosSlice = createSlice({
    name: 'sustitutoReproductiva',
    initialState: {
        data: {
            sustitutos: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                sustitutos: []

            }
        }

    },
    extraReducers: {
        [loadSustitutosPersonal.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                sustitutos: action.payload
            }

        }



    }
}
)

export const { clearData } = sustitutosSlice.actions;
export default sustitutosSlice.reducer;
import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'


export const loadFamiliares = createAsyncThunk(
    'familiares/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/familiares-personal/personal/${id}`,
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


export const loadFamiliar = createAsyncThunk(
    'familiar/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/familiares-personal/${id}`,
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

export const postFamiliar = createAsyncThunk(
    'familiar/post',
    async (familiar, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.post(`${API}/familiares-personal/`, {
                id_persona: familiar.idPersona,
                parentesco: familiar.parentesco,
                identificacion: familiar.identificacion,
                nombres: familiar.nombres.toUpperCase(),
                apellidos: familiar.apellidos.toUpperCase(),
                sexo: familiar.sexo,
                fecha_nacimiento: familiar.fechaNacimiento
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

export const putFamiliar = createAsyncThunk(
    'familiar/put',
    async (familiar, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.put(`${API}/familiares-personal/`,{
                id: familiar.id,
                parentesco: familiar.parentesco,
                identificacion: familiar.identificacion,
                nombres: familiar.nombres.toUpperCase(),
                apellidos: familiar.apellidos.toUpperCase(),
                sexo: familiar.sexo,
                fecha_nacimiento: familiar.fechaNacimiento
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

export const deleteFamiliar = createAsyncThunk(
    'familiar/detele',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.delete(`${API}/familiares-personal/${id}`,
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

let familiaresSlice = createSlice({
    name: 'familiares',
    initialState: {
        data: {
            familiares: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                familiares: []
               
            }
        }

    },
    extraReducers: {
        [loadFamiliares.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                familiares: action.payload
            }

        }
        


    }
}
)

export const { clearData } = familiaresSlice.actions;
export default familiaresSlice.reducer;
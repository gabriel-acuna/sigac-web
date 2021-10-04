import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadEstructurasInstitucionales = createAsyncThunk(
    'estructura-institucional/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/estructura-institucional`,
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

export const loadEstructura = createAsyncThunk(
    'estructura/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/estructura-institucional/${id}`,
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

export const postEstructuraInstitucional = createAsyncThunk(
    'estructura-institucional/post',
    async (estructura, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/estructura-institucional`, estructura,
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

export const putEstructuraInstitucional = createAsyncThunk(
    'estructura-institucional/put',
    async (estructura, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/estructura-institucional`, estructura,
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

export const deleteEstructura = createAsyncThunk(
    'estructura-institucional/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/estructura-institucional/${id}`,
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

let estructuraInstitucionalSlice = createSlice({
    name: 'estructuras',
    initialState: {
        data: {
            estructuras: []
            
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                estructuras: []
               
            }
        }

    },
    extraReducers: {
        [loadEstructurasInstitucionales.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                    estructuras: action.payload
                }

        }


    }
}
)

export const { clearData } = estructuraInstitucionalSlice.actions;
export default estructuraInstitucionalSlice.reducer;
import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'


export const loadDiscapacidades = createAsyncThunk(
    'discapacidades/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/discapacidades`,
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

export const loadDiscapacidad = createAsyncThunk(
    'discapacidad/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/discapacidades/${id}`,
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

export const postDiscapacidades = createAsyncThunk(
    'discapacidades/post',
    async (discapacidad, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/discapacidades`, discapacidad,
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

export const putDiscapacidades = createAsyncThunk(
    'discapacidades/put',
    async (discapacidad, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/discapacidades`, discapacidad,
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

export const deleteDiscapacidades = createAsyncThunk(
    'discapacidades/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/discapacidades/${id}`,
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

let discapacidadSlice = createSlice({
    name: 'discapacidades',
    initialState: {
        data: {
            discapacidades: []
            
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                discapacidades: [],
                
            }
        }

    },
    extraReducers: {
        [loadDiscapacidades.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = { discapacidades: action.payload }
        }
       

    }
})

export const { clearData } = discapacidadSlice.actions;
export default discapacidadSlice.reducer;
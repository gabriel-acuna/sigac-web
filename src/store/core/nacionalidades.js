import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadNacionalidades = createAsyncThunk(
    'nacionalidades/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/nacionalidades`,
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

export const loadNacionalidad = createAsyncThunk(
    'nacionalidad/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/nacionalidades/${id}`,
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

export const postNacionalidades = createAsyncThunk(
    'nacionalidades/post',
    async (nacionalidad, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/nacionalidades`, nacionalidad,
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

export const putNacionalidades = createAsyncThunk(
    'nacionalidades/put',
    async (nacionalidad, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/nacionalidades`, nacionalidad,
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

export const deleteNacionalidades = createAsyncThunk(
    'nacionalidades/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/nacionalidades/${id}`,
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

let nacionalidadesSlice = createSlice({
    name: 'nacionalidades',
    initialState: {
        data: {
            nacionalidades: [],
            nacionalidad: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                nacionalidades: [],
                nacionalidad: null
            }
        }

    },
    extraReducers: {
        [loadNacionalidades.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                nacionalidades: action.payload
            }
                
        }, [loadNacionalidad.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                nacionalidad: action.payload
            }
                
        }
        

        
    }
}
)

export const { clearData } = nacionalidadesSlice.actions;
export default nacionalidadesSlice.reducer;
import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadRelacionesIES = createAsyncThunk(
    'relaciones-ies/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/relaciones-ies`,
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

export const loadRelacionIES = createAsyncThunk(
    'relacion-ies/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/relaciones-ies/${id}`,
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

export const postRelacionesIES = createAsyncThunk(
    'relaciones-ies/post',
    async (relacionIES, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/relaciones-ies`, relacionIES,
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

export const putRelacionesIES = createAsyncThunk(
    'relaciones-ies/put',
    async (relacionIES, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/relaciones-ies`, relacionIES,
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

export const deleteRelacionesIES = createAsyncThunk(
    'relaciones-ies/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/relaciones-ies/${id}`,
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

let RelacionesIESSlice = createSlice({
    name: 'RelacionesIES',
    initialState: {
        data: {
            relacionesIES: [],
            relacionIES: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                relacionesIES: [],
                relacionIES: null
            }
        }

    },
    extraReducers: {
        [loadRelacionesIES.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                relacionesIES: action.payload
            }

        },
        [loadRelacionIES.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                relacionIES: action.payload
            }

        }


    }
}
)

export const { clearData } = RelacionesIESSlice.actions;
export default RelacionesIESSlice.reducer;
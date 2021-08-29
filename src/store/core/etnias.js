import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadEtinas = createAsyncThunk(
    'etinas/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/etinas`,
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

export const loadEtnia = createAsyncThunk(
    'etnia/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/etinas/${id}`,
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

export const postEtinas = createAsyncThunk(
    'etinas/post',
    async (etnia, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/etinas`, etnia,
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

export const putEtinas = createAsyncThunk(
    'etinas/put',
    async (etnia, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/etinas`, etnia,
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

export const deleteEtinas = createAsyncThunk(
    'etinas/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/etinas/${id}`,
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

let etniasSlice = createSlice({
    name: 'etinas',
    initialState: {
        data: {
            etnias: [],
            etnia: null
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                etnias: [],
                etnia: null
            }
        }

    },
    extraReducers: {
        [loadEtinas.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                    etnias: action.payload
                }

        },
        [loadEtnia.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                   
                    etnia: action.payload
                }

        }


    }
}
)

export const { clearData } = etniasSlice.actions;
export default etniasSlice.reducer;
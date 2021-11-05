import {

    createAsyncThunk,
    createSlice

} from '@reduxjs/toolkit'

import Axios from 'axios';
import { API } from '../../services/api';

export const loadProvincias = createAsyncThunk(
    'provincias/load',
    async (_, { getState }) => {
        let token;

        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.get(
                `${API}/provincias`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            throw error.response.detail
        }
    }
);

export const loadCantonesProvincia = createAsyncThunk(
    'provincias-cantones/load',
    async (id, { getState }) => {

        let token;

        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.get(
                `${API}/provincias/${id}/cantones`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            throw error.response.detail
        }
    }
);

export const postProvincias = createAsyncThunk('provincias/post',
    async (data, { getState }) => {
        let token;

        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.post(
                `${API}/provincias/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            throw error.response.detail
        }
    })

export const putProvincias = createAsyncThunk('provincias/put',
    async (data, { getState }) => {
        let token;

        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.put(
                `${API}/provincias/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            throw error.response.detail
        }
    })

export const postCantones = createAsyncThunk('canton-provincia/post',
    async (data, { getState }) => {
        let token;

        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.post(
                `${API}/cantones/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            throw error.response.detail
        }
    })

export const putCantones = createAsyncThunk('canton-provincia/put',
    async (data, { getState }) => {
        let token;

        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.put(
                `${API}/cantones/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            throw error.response.detail
        }
    })

export const deleteProvincias = createAsyncThunk(
    'provincias/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/provincias/${id}`,
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

export const deleteCantones = createAsyncThunk(
    'canton-provincia/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/cantones/${id}`,
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

let provinciasSilce = createSlice({
    name: 'provincias',
    initialState: {
        status: 'not loaded',
        data: {
            provincias: []
        }
    }, reducers: {
        clearData: (state) => {
            state.data = {
                provincias: []

            }

        }
    },
    extraReducers: {
        [loadProvincias.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                provincias: action.payload

            }

        }


    }

})
export const { clearData } = provinciasSilce.actions;
export default provinciasSilce.reducer;
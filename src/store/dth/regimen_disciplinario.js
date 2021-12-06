import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadRegimenesDisciplinarios = createAsyncThunk(
    'regimenes-disciplinarios/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/regimenes-disciplinarios`,
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

export const loadRegimen = createAsyncThunk(
    'regimen-disciplinario/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/regimenes-disciplinarios/${id}`,
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

export const postRegimenes = createAsyncThunk(
    'regimenes-disciplinarios/post',
    async (regimen, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/regimenes-disciplinarios`,
               regimen,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putRegimenes = createAsyncThunk(
    'regimenes-disciplinarios/put',
    async (regimen, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/regimenes-disciplinarios`,regimen
              ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }
)

export const deleteRegimenes = createAsyncThunk(
    'regimenes-disciplinarios/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/regimenes-disciplinarios/${id}`,
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

let regimenesSlice = createSlice({
    name: 'regimenes',
    initialState: {
        data: {
            regimenes: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                regimenes: []

            }
        }

    },
    extraReducers: {
        [loadRegimenesDisciplinarios.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                regimenes: action.payload
            }

        },
        [loadRegimenesDisciplinariosPersona.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                regimenes: action.payload
            }

        }


    }
}
)

export const { clearData } = regimenesSlice.actions;
export default regimenesSlice.reducer;
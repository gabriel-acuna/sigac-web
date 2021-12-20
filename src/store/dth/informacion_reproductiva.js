import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'


export const loadInformacionReproductivaPersonal = createAsyncThunk(
    'informacion-reproductiva/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/informacion-reproductiva/personal/${id}`,
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


export const loadInfoReproductiva = createAsyncThunk(
    'informacion/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/informacion-reproductiva/${id}`,
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

export const postInformacionReproductiva = createAsyncThunk(
    'informacion-reproductiva/post',
    async (informacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.post(`${API}/informacion-reproductiva/`, informacion,
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

export const putInformacionReproductiva = createAsyncThunk(
    'informacion-reproductiva/put',
    async (informacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.put(`${API}/informacion-reproductiva/`, informacion,
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

export const deleteInformacionReproductiva = createAsyncThunk(
    'informacion-reproductiva/detele',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.delete(`${API}/informacion-reproductiva/${id}`,
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

let informacionReproductivaSlice = createSlice({
    name: 'informacionReproductiva',
    initialState: {
        data: {
            informacion: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                informacion: []
               
            }
        }

    },
    extraReducers: {
        [loadInformacionReproductivaPersonal.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                informacion: action.payload
            }

        }
        


    }
}
)

export const { clearData } = informacionReproductivaSlice.actions;
export default informacionReproductivaSlice.reducer;
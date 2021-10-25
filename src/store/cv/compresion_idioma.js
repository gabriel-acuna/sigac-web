import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadIdiomas = createAsyncThunk(
    'idiomas/load',
    async ( id_persona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/idiomas/persona/${id_persona}`,
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

export const loadIdioma = createAsyncThunk(
    'idioma/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/idiomas/${id}`,
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

export const postIdiomas = createAsyncThunk(
    'idiomas/post',
    async ( idioma, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
        
            let response = await Axios.post(`${API}/idiomas`, idioma,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            console.log(err);
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putIdiomas = createAsyncThunk(
    'idiomas/put',
    async (idioma, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {

            let response = await Axios.put(`${API}/idiomas/${idioma.id}`, idioma.idioma,
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

export const deleteIdiomas = createAsyncThunk(
    'idiomas/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/idiomas/${id}`,
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

let idiomasSlice = createSlice({
    name: 'idiomas',
    initialState: {
        data: {
            idiomas: []  
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                idiomas: []
            }
        }

    },
    extraReducers: {
        [loadIdiomas.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                idiomas: action.payload
            }
        }


    }
}
)

export const { clearData } = idiomasSlice.actions;
export default idiomasSlice.reducer;
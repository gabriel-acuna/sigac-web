import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadAreasInstitucionales = createAsyncThunk(
    'areas-institucionales/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/areas-institucionales`,
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

export const loadArea = createAsyncThunk(
    'estado-civil/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/areas-institucionales/${id}`,
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

export const loadAreas = createAsyncThunk(
    'estado-civil/load',
    async ({ estructura, area }, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/areas-institucionales/${estructura}/${area}/areas`,
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

export const postArea = createAsyncThunk(
    'areas-institucionales/post',
    async (data, { getState }) => {
       
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/areas-institucionales`, {

                nombre: data.nombre.toUpperCase(),
                codigo: data.codigo.toUpperCase()

            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            console.log(error);
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putArea = createAsyncThunk(
    'areas-institucionales/put',
    async (area, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/areas-institucionales`, area,
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

export const deleteArea = createAsyncThunk(
    'areas-institucionales/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/areas-institucionales/${id}`,
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

let areasInstitucionalesSlice = createSlice({
    name: 'areas',
    initialState: {
        data: {
            areas: []

        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                areas: []

            }
        }

    },
    extraReducers: {
        [loadAreasInstitucionales.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                areas: action.payload
            }

        }


    }
}
)

export const { clearData } = areasInstitucionalesSlice.actions;
export default areasInstitucionalesSlice.reducer;
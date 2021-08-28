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



let provinciasSilce = createSlice({
    name: 'provincias',
    initialState: {
        status: 'not loaded',
        data: {
            provincias: []
        }
    }, reducers: {},
    extraReducers: {
        [loadProvincias.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {

                provincias: action.payload
            }


        }

    }

})

export default provinciasSilce.reducer;
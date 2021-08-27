import {

    createAsyncThunk,
    createSlice

} from '@reduxjs/toolkit'

import Axios from 'axios';
import { API } from '../../http-common';

export const loadPaises = createAsyncThunk(
    'paises/load',
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
                `${API}/paises`, {
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



let paisesSilce = createSlice({
    name: 'paises',
    initialState: {
        status: 'not loaded',
        data: {
            paises: []
        }
    }, reducers: {},
    extraReducers: {
        [loadPaises.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {

                videos: action.payload
            }


        }

    }

})

export default paisesSilce.reducer;
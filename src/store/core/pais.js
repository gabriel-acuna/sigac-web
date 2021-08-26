import {

    createAsyncThunk,
    createSlice

} from '@reduxjs/toolkit'

import Axios from 'axios';
import { API } from '../../http.common';

export const loadVideos = createAsyncThunk(
    'paises/load',
    async (thunkAPI) => {
        let token;

        try {
            token = thunkAPI.getState().user.user.jwtToken;
        } catch {
            return Promise.reject('There is not token')
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
    name: 'videos',
    initialState: {
        status: 'not loaded',
        data: {
            videos: []
        }
    }, reducers: {},
    extraReducers: {
        [loadVideos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {

                videos: action.payload
            }


        }

    }

})

export default paisesSilce.reducer;
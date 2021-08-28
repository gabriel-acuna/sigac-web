import {

    createAsyncThunk,
    createSlice

} from '@reduxjs/toolkit'

import Axios from 'axios';
import { API } from '../../services/api';

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
            throw error
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
    }, reducers: {
        clearData: (state) => {
            state.data.paises = []
        }

    },
    extraReducers: {
        [loadPaises.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {

                paises: action.payload
            }


        }

    }

})

export const { clearData } = paisesSilce.actions;
export default paisesSilce.reducer;
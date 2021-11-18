import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadPeridosAcademicos = createAsyncThunk(
    'periodos-academicos/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/periodos-academicos`,
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


let periodosAcademicosSlice = createSlice({
    name: 'periodos',
    initialState: {
        data: {
            periodos: []

        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                periodos: []

            }
        }

    },
    extraReducers: {
        [loadPeridosAcademicos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                periodos: action.payload
            }

        }


    }
}
)

export const { clearData } = periodosAcademicosSlice.actions;
export default periodosAcademicosSlice.reducer;
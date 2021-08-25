import {

    createAsyncThunk,
    createSlice

} from '@reduxjs/toolkit'
import config from 'react-dotenv'
import Axios from 'axios';


export const signIn = createAsyncThunk(
    'user/signIn', async ({ credentials }) => {
        let response = await Axios.post(`${config.URL_API}:${config.API_PORT}/api/login`,
         ...credentials
        );
    
        return response.data.user;
    }
);

let userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: ''
    },
    reducers: {
    
        logOut: (state) => {
            state.user = null
        }
    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signIn.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = 'success'
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'failed'
        }

    }
})

export const {  logOut } = userSlice.actions;
export default userSlice.reducer;
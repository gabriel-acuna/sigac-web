import {

    createAsyncThunk,
    createSlice

} from '@reduxjs/toolkit'
import { API } from '../http.common';
import Axios from 'axios';



export const signIn = createAsyncThunk(
    'user/signIn', async ({ credentials }) => {
        try{
            let response = await Axios.post(
                `${API}/login`,
                credentials
            );
            
            if (response.statusText === 'OK'){
                return response.data
            }
           
        }catch(err){

            throw err.response.data.detail
            
        }
    }, 
        
    
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
            state.user = action.payload
            state.status = 'success'
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'failed'
        }

    }
})

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
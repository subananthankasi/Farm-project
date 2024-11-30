import { createSlice } from "@reduxjs/toolkit";
import { forgotThunk } from "../Thunk/ForgotThunk";

const forgotSlice = createSlice({
    name:'forgotSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(forgotThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(forgotThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(forgotThunk.rejected ,(state,action)=>{
            state.error = action.payload.message
            state.loading = false

        });
    },
});
export const forgotReducer = forgotSlice.reducer


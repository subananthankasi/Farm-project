import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../Thunk/LoginThunk";

const LoginSlice = createSlice({
    name:'login',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(LoginThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(LoginThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(LoginThunk.rejected ,(state,action)=>{
            state.error = action.payload.message
            state.loading = false

        });
    },
});
export const loginReducer = LoginSlice.reducer


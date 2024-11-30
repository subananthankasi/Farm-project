import { createSlice } from "@reduxjs/toolkit";
import { stateCreateGetThunk } from "../../../Thunk/OthersThunk/State/StateCreateGetThunk";

export const stateCreateGetSlice = createSlice({
    name:'stateCreateGetSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(stateCreateGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(stateCreateGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(stateCreateGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const stateCreateGetReducer = stateCreateGetSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { updateStateThunk } from "../../../Thunk/OthersThunk/State/UpdateState";

export const updateStateSlice = createSlice({
    name:'updateStateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(updateStateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(updateStateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(updateStateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const updateStateReducer = updateStateSlice.reducer
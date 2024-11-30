import { createSlice } from "@reduxjs/toolkit";
import { deleteStateThunk } from "../../../Thunk/OthersThunk/State/DeleteThunk";

export const deleteStateSlice = createSlice({
    name:'deleteStateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(deleteStateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(deleteStateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(deleteStateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const deleteStateReducer = deleteStateSlice.reducer
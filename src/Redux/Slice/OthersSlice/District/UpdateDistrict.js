import { createSlice } from "@reduxjs/toolkit";
import { districtUpdateThunk } from "../../../Thunk/OthersThunk/District/UpdateDistrict";


export const districtUpdate = createSlice({
    name:'districtUpdate',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtUpdateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtUpdateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(districtUpdateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const districtUpdateReducer = districtUpdate.reducer
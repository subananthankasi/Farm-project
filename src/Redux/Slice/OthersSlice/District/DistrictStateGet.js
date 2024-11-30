import { createSlice } from "@reduxjs/toolkit";
import { districtStateGetThunk } from "../../../Thunk/OthersThunk/District/DistrictStateGetThunk";


export const districtStateGetSlice = createSlice({
    name:'districtStateGetSlice',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtStateGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtStateGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(districtStateGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const districtStateGetReducer = districtStateGetSlice.reducer
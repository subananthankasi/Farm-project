import { createSlice } from "@reduxjs/toolkit";
import { districtGetThunk } from "../../../Thunk/OthersThunk/District/DistrictGetThunk";


export const districtGetSlice = createSlice({
    name:'districtGetSlice',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(districtGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const districtGetReducer = districtGetSlice.reducer
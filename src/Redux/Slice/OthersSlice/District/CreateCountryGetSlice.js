import { createSlice } from "@reduxjs/toolkit";
import { districtCountryGetThunk } from "../../../Thunk/OthersThunk/District/CreateGetCountry";


export const createDistrictGetCountrySlice = createSlice({
    name:'createDistrictGetCountrySlice',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtCountryGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtCountryGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(districtCountryGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const createDistrictGetCountryReducer = createDistrictGetCountrySlice.reducer
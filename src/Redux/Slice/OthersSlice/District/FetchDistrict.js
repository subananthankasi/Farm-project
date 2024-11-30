import { createSlice } from "@reduxjs/toolkit";
import { districtFetchThunk } from "../../../Thunk/OthersThunk/District/FetchDistrict";


export const fetchDistrict = createSlice({
    name:'fetchDistrictState',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtFetchThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtFetchThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(districtFetchThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const fetchDistrictReducer = fetchDistrict.reducer
import { createSlice } from "@reduxjs/toolkit";
import { districtFetchStateThunk } from "../../../Thunk/OthersThunk/District/FetchState";


export const fetchDistrictState = createSlice({
    name:'fetchDistrictState',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtFetchStateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtFetchStateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(districtFetchStateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const fetchDistrictStateReducer = fetchDistrictState.reducer
import { createSlice } from "@reduxjs/toolkit";
import { countryDeleteThunk } from "../../../Thunk/OthersThunk/Country/CountryDltThunk";

const countryDltSlice = createSlice({
    name:'countryDltSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(countryDeleteThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(countryDeleteThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(countryDeleteThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const countryDeleteReducer = countryDltSlice.reducer
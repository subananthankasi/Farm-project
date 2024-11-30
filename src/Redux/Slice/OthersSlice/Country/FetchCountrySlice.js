import { createSlice } from "@reduxjs/toolkit";
import { countryGetThunk } from "../../../Thunk/OthersThunk/Country/CountryThunk";
import { countryFetchThunk } from "../../../Thunk/OthersThunk/Country/FetchCountryThunk";

const countryFetchSlice = createSlice({
    name:'countryFetchSlice',
    initialState:{
        data:[],
        error:null,
        loading:false
    },
    extraReducers(builder){
        builder.addCase(countryFetchThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(countryFetchThunk.fulfilled,(state,action)=>{
          
                state.loading = false;
                state.data = action.payload;
           
        });
        builder.addCase(countryFetchThunk.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload
        });
    }
})
export const countryFetchReducer = countryFetchSlice.reducer
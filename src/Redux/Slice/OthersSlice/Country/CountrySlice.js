import { createSlice } from "@reduxjs/toolkit";
import { countryGetThunk } from "../../../Thunk/OthersThunk/Country/CountryThunk";

const countryGetSlice = createSlice({
    name:'countryGetSlice',
    initialState:{
        data:[],
        error:null,
        loading:false
    },
    extraReducers(builder){
        builder.addCase(countryGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(countryGetThunk.fulfilled,(state,action)=>{
          
                state.loading = false;
                state.data = action.payload;
           
        });
        builder.addCase(countryGetThunk.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload
        });
    }
})
export const countryGetReducer = countryGetSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { countryUpdateThunk } from "../../../Thunk/OthersThunk/Country/UpdateCountryThunk";

const countryUpdateSlice = createSlice({
    name:'countryUpdateSlice',
    initialState:{
        data:[],
        error:null,
        loading:false
    },
    extraReducers(builder){
        builder.addCase(countryUpdateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(countryUpdateThunk.fulfilled,(state,action)=>{
          
                state.loading = false;
                state.data = action.payload;
           
        });
        builder.addCase(countryUpdateThunk.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload
        });
    }
})
export const countryUpdateReducer = countryUpdateSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { countryCreateThunk } from "../../../Thunk/OthersThunk/Country/CountryCreateThunk";

const CountryCreateSlice = createSlice({
    name:'CountryCreateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(countryCreateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(countryCreateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(countryCreateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const countryCreateReducer = CountryCreateSlice.reducer
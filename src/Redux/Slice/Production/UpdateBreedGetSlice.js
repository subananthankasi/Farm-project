import { createSlice } from "@reduxjs/toolkit";
import { productionUpdateGetThunk } from "../../Thunk/production/UpdateGet";
import { productionUpdateBreedGetThunk } from "../../Thunk/production/UpdateBreedGet";

export const productionUpdateBreedGetSlice = createSlice({
    name:'productionUpdateBreedGetSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionUpdateBreedGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionUpdateBreedGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionUpdateBreedGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionUpdateBreedGetReducer = productionUpdateBreedGetSlice.reducer
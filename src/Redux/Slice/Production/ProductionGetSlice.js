import { createSlice } from "@reduxjs/toolkit";
import { productionGetThunk } from "../../Thunk/production/ProductionGetThunk";

export const productionGetSlice = createSlice({
    name:'productionGetSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionGetReducer = productionGetSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { productionUpdateGetThunk } from "../../Thunk/production/UpdateGet";

export const productionUpdateGetSlice = createSlice({
    name:'productionUpdateGetSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionUpdateGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionUpdateGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionUpdateGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionUpdateGetReducer = productionUpdateGetSlice.reducer
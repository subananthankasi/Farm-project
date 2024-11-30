import { createSlice } from "@reduxjs/toolkit";
import { productionUpdateThunk } from "../../Thunk/production/UpdateThunk";

export const productionUpdateSlice = createSlice({
    name:'productionUpdateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionUpdateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionUpdateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        
        }); 
         builder.addCase(productionUpdateThunk.rejected,(state,action)=>{
            state.error = action.payload
            state.loading = false
        });
    }
})
export const productionUpdateReducer = productionUpdateSlice.reducer
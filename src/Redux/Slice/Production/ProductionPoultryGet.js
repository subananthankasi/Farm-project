import { createSlice } from "@reduxjs/toolkit";
import { productionPoultryGetThunk } from "../../Thunk/production/ProductionPoultryGetThunk";

export const productionPoultryGet = createSlice({
    name:'productionPoultryGet',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionPoultryGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionPoultryGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionPoultryGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionPoultryGetReducer = productionPoultryGet.reducer
import { createSlice } from "@reduxjs/toolkit";
import { productionCreateThunk } from "../../Thunk/production/ProductionCreateThunk";

export const productionCreate = createSlice({
    name:'productionCreate',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionCreateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionCreateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionCreateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionCreateReducer = productionCreate.reducer
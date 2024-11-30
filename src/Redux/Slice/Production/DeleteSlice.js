import { createSlice } from "@reduxjs/toolkit";
import { productionDeleteThunk } from "../../Thunk/production/DeleteProductionThunk";

export const productionDeleteSlice = createSlice({
    name:'productionDeleteSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionDeleteThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionDeleteThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionDeleteThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionDeleteReducer = productionDeleteSlice.reducer
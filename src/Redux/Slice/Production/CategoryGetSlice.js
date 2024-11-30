import { createSlice } from "@reduxjs/toolkit";
import { productionGetThunk } from "../../Thunk/production/ProductionGetThunk";
import { productionCategoryThunk } from "../../Thunk/production/CategoryThunk";

export const productionCategoryGet = createSlice({
    name:'productionCategoryGet',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(productionCategoryThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(productionCategoryThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data= action.payload
        }); 
         builder.addCase(productionCategoryThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        });
    }
})
export const productionCategoryGetReducer = productionCategoryGet.reducer
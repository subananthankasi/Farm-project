import { createSlice } from "@reduxjs/toolkit";
import { productFetch } from "../../../Thunk/MasterThunk/ProductThunk/ProductFetchThunk";

const ProductFetchSlice=createSlice({
    name:"ProductFetchSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productFetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productFetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(productFetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductFetchReducer=ProductFetchSlice.reducer;
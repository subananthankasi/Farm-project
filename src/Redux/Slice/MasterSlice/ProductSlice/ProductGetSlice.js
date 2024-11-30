import { createSlice } from "@reduxjs/toolkit";
import { productGet } from "../../../Thunk/MasterThunk/ProductThunk/ProductGetThunk";

const ProductGetSlice=createSlice({
    name:"ProductGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(productGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductGetReducer=ProductGetSlice.reducer;
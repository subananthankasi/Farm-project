import { createSlice } from "@reduxjs/toolkit";
import { productUpdate } from "../../../Thunk/MasterThunk/ProductThunk/ProductUpdateThunk";

const ProductUpdateSlice=createSlice({
    name:"ProductUpdateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productUpdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
            console.log("action.payload",action.payload)
        });
        builder.addCase(productUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductUpdateReducer=ProductUpdateSlice.reducer;
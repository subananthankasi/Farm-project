import { createSlice } from "@reduxjs/toolkit";
import { productDelete } from "../../../Thunk/MasterThunk/ProductThunk/ProductDeleteThunk";

const ProductDeleteSlice=createSlice({
    name:"ProductDeleteSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productDelete.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productDelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(productDelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductDeleteReducer=ProductDeleteSlice.reducer;
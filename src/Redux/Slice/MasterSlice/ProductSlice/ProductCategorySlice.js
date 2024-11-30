import { createSlice } from "@reduxjs/toolkit";
import { productCategoryGet } from "../../../Thunk/MasterThunk/ProductThunk/ProductCategoryGet";

const ProductCategoryGetSlice=createSlice({
    name:"ProductCategoryGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productCategoryGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productCategoryGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(productCategoryGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductCategoryGetReducer=ProductCategoryGetSlice.reducer;
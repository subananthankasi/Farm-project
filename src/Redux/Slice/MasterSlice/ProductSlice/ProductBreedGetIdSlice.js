import { createSlice } from "@reduxjs/toolkit";
import { productBreedGet } from "../../../Thunk/MasterThunk/ProductThunk/ProductBreedGetIdThunk";

const ProductBreedGetSlice=createSlice({
    name:"ProductBreedGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productBreedGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productBreedGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(productBreedGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductBreedGetReducer=ProductBreedGetSlice.reducer;
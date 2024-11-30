import { createSlice } from "@reduxjs/toolkit";
import { productCreate } from "../../../Thunk/MasterThunk/ProductThunk/ProductPostThunk";

const ProductSlice=createSlice({
    name:"ProductSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(productCreate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(productCreate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(productCreate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ProductCreateReducer=ProductSlice.reducer;
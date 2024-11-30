import { createSlice } from "@reduxjs/toolkit";
import { salesFetchProductThunk } from "../../Thunk/Sales/FetchProduct";

const salesFetchProduct = createSlice({
    name:'salesFetchProduct',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesFetchProductThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesFetchProductThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesFetchProductThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesFetchProductReducer = salesFetchProduct.reducer


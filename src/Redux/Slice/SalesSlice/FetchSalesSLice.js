import { createSlice } from "@reduxjs/toolkit";
import { salesCreateThunk } from "../../Thunk/Sales/CreateSale";
import { salesFetchThunk } from "../../Thunk/Sales/FetchSales";

const salesFetch = createSlice({
    name:'salesFetch',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesFetchThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesFetchThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesFetchThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesFetchReducer = salesFetch.reducer


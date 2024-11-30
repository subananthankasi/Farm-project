import { createSlice } from "@reduxjs/toolkit";
import { salesProductGetThunk } from "../../Thunk/Sales/ProductGet";

const salesProductGetSlice = createSlice({
    name:'salesProductGetSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesProductGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesProductGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesProductGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesProductGetReducer = salesProductGetSlice.reducer


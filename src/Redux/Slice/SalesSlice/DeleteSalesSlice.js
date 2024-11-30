import { createSlice } from "@reduxjs/toolkit";
import { salesDeleteThunk } from "../../Thunk/Sales/DeleteSales";

const salesDelete = createSlice({
    name:'salesDelete',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesDeleteThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesDeleteThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesDeleteThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesDeleteReducer = salesDelete.reducer


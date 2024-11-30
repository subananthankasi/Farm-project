import { createSlice } from "@reduxjs/toolkit";
import { salesUpdateThunk } from "../../Thunk/Sales/UpdateSaleThunk";

const salesUpdate = createSlice({
    name:'salesUpdate',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesUpdateThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesUpdateThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesUpdateThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesUpdateReducer = salesUpdate.reducer


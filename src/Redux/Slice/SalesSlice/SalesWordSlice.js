import { createSlice } from "@reduxjs/toolkit";
import { salesWordThunk } from "../../Thunk/Sales/WordSale";

const salesWordSlice = createSlice({
    name:'salesWordSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesWordThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesWordThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesWordThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesWordReducer = salesWordSlice.reducer


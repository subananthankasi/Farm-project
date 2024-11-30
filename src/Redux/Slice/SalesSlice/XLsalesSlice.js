import { createSlice } from "@reduxjs/toolkit";
import { salesXlThunk } from "../../Thunk/Sales/XLdownload";

const salesXl = createSlice({
    name:'salesXl',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesXlThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesXlThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesXlThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesXlReducer = salesXl.reducer


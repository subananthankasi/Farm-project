import { createSlice } from "@reduxjs/toolkit";
import { salesGetThunk } from "../../Thunk/Sales/Salesget";

const salesGetSlice = createSlice({
    name:'salesGetSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesGetReducer = salesGetSlice.reducer


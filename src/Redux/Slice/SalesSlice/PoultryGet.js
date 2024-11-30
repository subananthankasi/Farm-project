import { createSlice } from "@reduxjs/toolkit";
import { salesPoultryGetThunk } from "../../Thunk/Sales/PoultryGet";

const salesPoultryGetSlice = createSlice({
    name:'salesPoultryGetSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesPoultryGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesPoultryGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesPoultryGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesPoultryGetReducer = salesPoultryGetSlice.reducer


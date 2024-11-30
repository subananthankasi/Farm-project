import { createSlice } from "@reduxjs/toolkit";
import { transPoultryGetThunk } from "../../Thunk/Transaction/PoultryGet";

const transPoultry = createSlice({
    name:'transPoultry',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(transPoultryGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(transPoultryGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(transPoultryGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const transPoultryReducer = transPoultry.reducer


import { createSlice } from "@reduxjs/toolkit";
import { insideDeletePoultryThunk } from "../../Thunk/PoultryBreed/InsideDeletePoultryThunk";

const insideDeletePoultry = createSlice({
    name:'insideDeletePoultry',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(insideDeletePoultryThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(insideDeletePoultryThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(insideDeletePoultryThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const insideDeletePoultryReducer = insideDeletePoultry.reducer


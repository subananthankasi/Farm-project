import { createSlice } from "@reduxjs/toolkit";
import { poultryWordThunk } from "../../Thunk/PoultryBreed/WordPoultryBreed";

const poultryBreedWord = createSlice({
    name:'poultryBreedWord',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryWordThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryWordThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryWordThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedWordReducer = poultryBreedWord.reducer


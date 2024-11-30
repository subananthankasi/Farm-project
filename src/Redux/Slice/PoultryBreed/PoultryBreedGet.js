import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedPageGetThunk } from "../../Thunk/PoultryBreed/PoultryBreedGet";

const poultryBreedPageGet = createSlice({
    name:'poultryBreedPageGet',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedPageGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedPageGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedPageGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedGetReducer = poultryBreedPageGet.reducer


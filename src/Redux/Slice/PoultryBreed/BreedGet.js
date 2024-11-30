import { createSlice } from "@reduxjs/toolkit";
import { poultryBreed_BreedGetThunk } from "../../Thunk/PoultryBreed/BreedGetThunk";

const poultryBreed_BreedGet = createSlice({
    name:'poultryBreed_BreedGet',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreed_BreedGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreed_BreedGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreed_BreedGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreed_BreedGetReducer = poultryBreed_BreedGet.reducer


import { createSlice } from "@reduxjs/toolkit";

import { poultryBreedPoultryIdGetThunk } from "../../Thunk/PoultryBreed/PoultryBreedGetId";

const poultryBreedPoultryGetId = createSlice({
    name:'poultryBreedPoultryGetId',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedPoultryIdGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedPoultryIdGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedPoultryIdGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedPoultryGetIdReducer = poultryBreedPoultryGetId.reducer


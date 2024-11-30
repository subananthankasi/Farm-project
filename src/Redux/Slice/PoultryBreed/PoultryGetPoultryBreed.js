import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedPoultryGetThunk } from "../../Thunk/PoultryBreed/PoultryBreedPoultryGet";

const poultryBreedPoultryGet = createSlice({
    name:'poultryBreedPoultryGet',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedPoultryGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedPoultryGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedPoultryGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedPoultryGetReducer = poultryBreedPoultryGet.reducer


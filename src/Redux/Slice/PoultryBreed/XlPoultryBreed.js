import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedUpdateThunkData } from "../../Thunk/PoultryBreed/UpdatePoultryBreedThunk";
import { poultryBreedXlThunk } from "../../Thunk/PoultryBreed/XlPoultryBreedThunk";

const poultryBreedXl = createSlice({
    name:'poultryBreedXl',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedXlThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedXlThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedXlThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedXlReducer = poultryBreedXl.reducer


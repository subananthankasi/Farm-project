import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedDeleteThunk } from "../../Thunk/PoultryBreed/DeletePoultryBreed";

const poultryBreedDelete = createSlice({
    name:'poultryBreedDelete',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedDeleteThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedDeleteThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedDeleteThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedDeleteReducer = poultryBreedDelete.reducer


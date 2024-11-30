import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedSearchThunk } from "../../Thunk/PoultryBreed/PoultryBreedSearch";

const poultrySearach = createSlice({
    name:'poultrySearach',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedSearchThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedSearchThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedSearchThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultrySearachReducer = poultrySearach.reducer


import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedFetchThunk } from "../../Thunk/PoultryBreed/FetchPoultryBreed";

const fetchPoultryBreedSlice = createSlice({
    name:'fetchPoultryBreedSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedFetchThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedFetchThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedFetchThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const fetchPoultryBreedReducer = fetchPoultryBreedSlice.reducer


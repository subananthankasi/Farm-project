import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedCreateThunk } from "../../Thunk/PoultryBreed/CreatePoultryBreedThunk";

const poultryBreedCreate = createSlice({
    name:'poultryBreedCreate',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedCreateThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedCreateThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedCreateThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedCreateReducer = poultryBreedCreate.reducer


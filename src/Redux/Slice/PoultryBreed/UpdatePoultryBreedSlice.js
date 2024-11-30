import { createSlice } from "@reduxjs/toolkit";
import { poultryBreedUpdateThunkData } from "../../Thunk/PoultryBreed/UpdatePoultryBreedThunk";

const poultryBreedUpdate = createSlice({
    name:'poultryBreedUpdate',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(poultryBreedUpdateThunkData.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(poultryBreedUpdateThunkData.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(poultryBreedUpdateThunkData.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const poultryBreedUpdateReducer = poultryBreedUpdate.reducer


import { createSlice } from "@reduxjs/toolkit";
import { BreedUpdate } from "../../../Thunk/MasterThunk/Breed/BreedUpdataThunk";

const BreedUpSlice=createSlice({
    name:"BreedUpSlice",
    initialState:{
        loading:false,
        error:[],
        data:[]
    },
    extraReducers(builder){
        builder.addCase(BreedUpdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(BreedUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(BreedUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const BreedUpdateReducer=BreedUpSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { Breedscreate } from "../../../Thunk/MasterThunk/Breed/BreedPostThunk";

const BreedCtSlice=createSlice({
    name:"BreedCtSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Breedscreate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Breedscreate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Breedscreate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const BreedCreateReducer=BreedCtSlice.reducer;
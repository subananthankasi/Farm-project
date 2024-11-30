import { createSlice } from "@reduxjs/toolkit";
import { Breedget } from "../../../Thunk/MasterThunk/Breed/BreedGetThunk";

const BreedgetSlice=createSlice({
    name:"BreedgetSlice",
    initialState:{
        loading:false,
        error:[],
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Breedget.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Breedget.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Breedget.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const BreedgetReducer=BreedgetSlice.reducer;
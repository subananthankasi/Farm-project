import { createSlice } from "@reduxjs/toolkit";
import { Breedfetch } from "../../../Thunk/MasterThunk/Breed/BreedFetchThunk";

const BreedfetchSlice=createSlice({
    name:"BreedfetchSlice",
    initialState:{
        loading:false,
        error:[],
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Breedfetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Breedfetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Breedfetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const BreedfetchReducer=BreedfetchSlice.reducer;
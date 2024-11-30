import { createSlice } from "@reduxjs/toolkit";
import { Breedtype } from "../../../Thunk/MasterThunk/Breed/BreedTypegetThunk";

const BreedtypegetSlice=createSlice({
    name:"BreedtypegetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Breedtype.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Breedtype.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Breedtype.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const BreedtypegetReducer=BreedtypegetSlice.reducer;
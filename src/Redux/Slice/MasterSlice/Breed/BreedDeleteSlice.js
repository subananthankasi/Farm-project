import { createSlice } from "@reduxjs/toolkit";
import { Breeddelete } from "../../../Thunk/MasterThunk/Breed/BreedDeleteThunk";

const BreeddeleteSlice=createSlice({
    name:"BreeddeleteSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Breeddelete.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Breeddelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Breeddelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const BreedDeleteReducer=BreeddeleteSlice.reducer;
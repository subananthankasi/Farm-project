import { createSlice } from "@reduxjs/toolkit";
import { BreedtypeUpdate } from "../../../Thunk/MasterThunk/Breedtype/BreedtypeUpdateThunk";

 const BTUpdateSlice=createSlice({
    name:'BTUpdateSlice',
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(BreedtypeUpdate.pending,(state)=>{
            state.loading=true;

        });
        builder.addCase(BreedtypeUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(BreedtypeUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    },
});
export const BTUpdateReducer=BTUpdateSlice.reducer;
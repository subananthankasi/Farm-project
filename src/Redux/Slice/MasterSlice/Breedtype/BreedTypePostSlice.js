import { createSlice } from "@reduxjs/toolkit";
import { BreedtypeCreate } from "../../../Thunk/MasterThunk/Breedtype/BreedTypePostThunk";

const BreedtypeSlice=createSlice({
    name:"BreedtypeSlice",
    initialState:{
        loading:false,
        error:[],
        data:[],
    },
    extraReducers(builder){
        builder.addCase(BreedtypeCreate.pending,(state,action)=>{
            state.loading=true;
         });
        builder.addCase(BreedtypeCreate.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.loading=false;

        });
        builder.addCase(BreedtypeCreate.rejected,(state,action)=>{
            console.log("errs",action.payload);        
            state.error=action.payload;
            state.loading=false;

        });

    },

});
export const BreedTypeCreate=BreedtypeSlice.reducer;
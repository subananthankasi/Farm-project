import { createSlice } from "@reduxjs/toolkit";
import { BreedtypeDelete } from "../../../Thunk/MasterThunk/Breedtype/BreedtypeDeleteThunk";


const BTdeleteSlice=createSlice({
    name:'BTdeleteSlice',

 initialState:{
    loading:false,
    error:[],
    data:[]
 },
 extraReducers(builder){
    builder.addCase(BreedtypeDelete.pending,(state) =>{
     state.loading=true;

    });
    builder.addCase(BreedtypeDelete.fulfilled,(state,action) =>{
        state.loading=false;
        state.data=action.payload
        // console.log("delete",action.payload)
    });
    builder.addCase(BreedtypeDelete.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        // console.log("slierr",action.payload)

    });

 },

});
export const BTDeleteReducer=BTdeleteSlice.reducer;
 
import { createSlice } from "@reduxjs/toolkit";
import { BreedtypeFetchGet } from "../../../Thunk/MasterThunk/Breedtype/BreedtypegetFetchThunk";

const BTGetFetch=createSlice({
    name:'BTGetFetch',
    initialState:{
        loading:false,
        error:null,
        date:[]
    },
    extraReducers(builder){
        builder.addCase(BreedtypeFetchGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(BreedtypeFetchGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(BreedtypeFetchGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        });
    }

});
export const  BTfetchGetReducer=BTGetFetch.reducer;
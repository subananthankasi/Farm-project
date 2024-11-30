import { createSlice } from "@reduxjs/toolkit";
import { poultryfetch } from "../../../Thunk/MasterThunk/Poultry/PoultryFetchThunk";

const PoultryfetchSlice=createSlice({
    name:"PoultryfetchSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultryfetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultryfetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(poultryfetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultryFetchReducer=PoultryfetchSlice.reducer;
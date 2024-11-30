import { createSlice } from "@reduxjs/toolkit";
import { poultrycreate } from "../../../Thunk/MasterThunk/Poultry/PoultryPostThunk";

const PoultrySlice=createSlice({
    name:"PoultrySlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultrycreate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultrycreate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(poultrycreate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultryCreateReducer=PoultrySlice.reducer;
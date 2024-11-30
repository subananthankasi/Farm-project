import { createSlice } from "@reduxjs/toolkit";
import { poultryupdate } from "../../../Thunk/MasterThunk/Poultry/PoultryUpdateThunk";

const PoultryUpSlice=createSlice({
    name:"PoultryUpSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultryupdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultryupdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(poultryupdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultryUpdateReducer=PoultryUpSlice.reducer;
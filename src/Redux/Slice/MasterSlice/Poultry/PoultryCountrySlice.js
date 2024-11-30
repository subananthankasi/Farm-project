import { createSlice } from "@reduxjs/toolkit";
import { poultrycountry } from "../../../Thunk/MasterThunk/Poultry/PoultryCountryThunk";

const PoultrycountrySlice=createSlice({
    name:"PoultrycountrySlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultrycountry.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultrycountry.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
            console.log("action.payload",action.payload)
        });
        builder.addCase(poultrycountry.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultrycountryReducer=PoultrycountrySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { poultrycountryget } from "../../../Thunk/MasterThunk/Poultry/PoultryCountrygetThunk";

const PoultrycountrygetSlice=createSlice({
    name:"PoultrycountrygetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultrycountryget.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultrycountryget.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(poultrycountryget.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultrycountryGetReducer=PoultrycountrygetSlice.reducer;
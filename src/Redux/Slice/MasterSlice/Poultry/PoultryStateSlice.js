import { createSlice } from "@reduxjs/toolkit";
import { poultryState } from "../../../Thunk/MasterThunk/Poultry/PoultryStateThunk";

const PoultrystateSlice=createSlice({
    name:"PoultrystateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultryState.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultryState.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
            console.log("action",action.payload)
        });
        builder.addCase(poultryState.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultryStateReducer=PoultrystateSlice.reducer;
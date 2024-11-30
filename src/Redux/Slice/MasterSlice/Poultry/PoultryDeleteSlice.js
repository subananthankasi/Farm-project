import { createSlice } from "@reduxjs/toolkit";
import { poultrydelete } from "../../../Thunk/MasterThunk/Poultry/PoultryDeleteThunk";

const PoultrydltSlice=createSlice({
    name:"PoultrydltSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultrydelete.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultrydelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(poultrydelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultryDeleteReducer=PoultrydltSlice.reducer;
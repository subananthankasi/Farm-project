import { createSlice } from "@reduxjs/toolkit";
import { poultryget } from "../../../Thunk/MasterThunk/Poultry/PoultryGetThunk";

const PoultrygetSlice=createSlice({
    name:"PoultrygetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(poultryget.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(poultryget.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(poultryget.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const PoultryGetReducer=PoultrygetSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { categoryupdate } from "../../../Thunk/MasterThunk/CategoryThunk/CategoryUpdateThunk";
 
const cgupdateSlice=createSlice({
    name:"cgupdateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(categoryupdate.pending,(state)=>{
            state.loading=true;

        });
        builder.addCase(categoryupdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(categoryupdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const CategoryUpdateReducer=cgupdateSlice.reducer;

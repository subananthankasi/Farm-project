import { createSlice } from "@reduxjs/toolkit";
import { categoryget } from "../../../Thunk/MasterThunk/CategoryThunk/CategoryGetThunk";

const cgGetSlice=createSlice({
    name:"cgGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(categoryget.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(categoryget.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(categoryget.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        });
    },
});
export const CategoryGetReducer=cgGetSlice.reducer;
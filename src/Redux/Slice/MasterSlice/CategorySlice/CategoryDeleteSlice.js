import { createSlice } from "@reduxjs/toolkit";
import { categorydelete } from "../../../Thunk/MasterThunk/CategoryThunk/CategoryDeletedThunk";

const cgDeleteSlice=createSlice({
    name:"cgDeleteSlice",
    initialState:{
        loading:false,
        error:[],
        data:[]
    },
    extraReducers(builder){
        builder.addCase(categorydelete.pending,(state)=>{
            state.loading=true;

        });
        builder.addCase(categorydelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;

        });
        builder.addCase(categorydelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            console.log("action.payload",action.payload)
        });
    },
});
export const CategoryDeleteReducer=cgDeleteSlice.reducer;
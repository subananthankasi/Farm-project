import { createSlice } from "@reduxjs/toolkit";
import { categoryPost } from "../../../Thunk/MasterThunk/CategoryThunk/CategoryPostThunk";

const CgPostSlice=createSlice({
 name:"CgPostSlice",
 initialState:{
    loading:false,
    error:[],
    data:[]
 },
 extraReducers(builder){
    builder.addCase(categoryPost.pending,(state)=>{
        state.loading=true;
    });
    builder.addCase(categoryPost.fulfilled,(state,action)=>{
        state.loading=false;
        state.data=action.payload;

    });
    builder.addCase(categoryPost.rejected,(state,action)=>{
        state.loading=false;
        console.log("action.payload",action.payload)
        state.error=action.payload;
    });

 },

});
export const CatePostReducer=CgPostSlice.reducer;

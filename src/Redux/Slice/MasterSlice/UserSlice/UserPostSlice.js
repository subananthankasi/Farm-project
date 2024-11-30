import { createSlice } from "@reduxjs/toolkit";
import { userCreate } from "../../../Thunk/MasterThunk/User/UserPostThunk";

const userPostSlice=createSlice({
    name:"userPostSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userCreate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userCreate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userCreate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userPostReducer=userPostSlice.reducer;
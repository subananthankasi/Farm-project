import { createSlice } from "@reduxjs/toolkit";
import { userUpdate } from "../../../Thunk/MasterThunk/User/UserUpdateThunk";

const userUpdateSlice=createSlice({
    name:"userUpdateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userUpdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userUpdateReducer=userUpdateSlice.reducer;
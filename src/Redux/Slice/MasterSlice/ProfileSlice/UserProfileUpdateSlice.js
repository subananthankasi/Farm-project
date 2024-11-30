import { createSlice } from "@reduxjs/toolkit";
import { userProfileUpdate } from "../../../Thunk/MasterThunk/Profile/UserProfileUpdateThunk";

const userProfileUpdateSlice=createSlice({
    name:"userProfileUpdateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userProfileUpdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userProfileUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userProfileUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userProfileUpdateReducer=userProfileUpdateSlice.reducer;
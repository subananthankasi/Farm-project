import { createSlice } from "@reduxjs/toolkit";
import { userProfilePasswordUpdate } from "../../../Thunk/MasterThunk/Profile/UserPassword";

const userProfilePasswordSlice=createSlice({
    name:"userProfilePasswordSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userProfilePasswordUpdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userProfilePasswordUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userProfilePasswordUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userProfilePasswordReducer=userProfilePasswordSlice.reducer;
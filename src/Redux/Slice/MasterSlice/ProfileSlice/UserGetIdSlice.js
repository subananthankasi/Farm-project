import { createSlice } from "@reduxjs/toolkit";
import { userProfileFetch } from "../../../Thunk/MasterThunk/Profile/UserGetIdThunk";

const userProfileFetchSlice=createSlice({
    name:"userProfileFetchSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userProfileFetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userProfileFetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userProfileFetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userProfileFetchReducer=userProfileFetchSlice.reducer;
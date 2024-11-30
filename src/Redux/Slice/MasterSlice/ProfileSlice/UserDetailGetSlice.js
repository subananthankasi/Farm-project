import { createSlice } from "@reduxjs/toolkit";
import { userProfileGet } from "../../../Thunk/MasterThunk/Profile/UserDetailGetThunk";

const userProfileGetSlice=createSlice({
    name:"userProfileGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userProfileGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userProfileGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userProfileGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userProfileGetReducer=userProfileGetSlice.reducer;
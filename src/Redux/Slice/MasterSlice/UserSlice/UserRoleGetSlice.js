import { createSlice } from "@reduxjs/toolkit";
import { userRoleGet } from "../../../Thunk/MasterThunk/User/UserRoleGetThunk";

const userRoleGetSlice=createSlice({
    name:"userGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userRoleGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userRoleGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userRoleGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userRoleGetReducer=userRoleGetSlice.reducer;
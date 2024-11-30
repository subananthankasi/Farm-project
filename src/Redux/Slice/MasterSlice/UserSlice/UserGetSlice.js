import { createSlice } from "@reduxjs/toolkit";
import { userGet } from "../../../Thunk/MasterThunk/User/UserGetThunk";

const userGetSlice=createSlice({
    name:"userGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userGetReducer=userGetSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { userDelete } from "../../../Thunk/MasterThunk/User/UserDeletehunk";

const userDeleteSlice=createSlice({
    name:"userDeleteSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userDelete.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userDelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userDelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userDeleteReducer=userDeleteSlice.reducer;
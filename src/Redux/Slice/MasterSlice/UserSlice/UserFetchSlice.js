import { createSlice } from "@reduxjs/toolkit";
import { userFetch } from "../../../Thunk/MasterThunk/User/UserFetchThunk";

const userFetchSlice=createSlice({
    name:"userFetchSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(userFetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(userFetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(userFetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const userFetchReducer=userFetchSlice.reducer;
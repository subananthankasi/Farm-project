import { createSlice } from "@reduxjs/toolkit";
import { customerUpdate } from "../../../Thunk/MasterThunk/Customer/CustomerUpdateThunk";

const customerUpdateSlice=createSlice({
    name:"customerUpdateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerUpdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerUpdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerUpdate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerUpdateReducer=customerUpdateSlice.reducer;
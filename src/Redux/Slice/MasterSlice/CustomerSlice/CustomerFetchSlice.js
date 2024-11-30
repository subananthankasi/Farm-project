import { createSlice } from "@reduxjs/toolkit";
import { customerFetch } from "../../../Thunk/MasterThunk/Customer/CustomerFetchThunk";

const customerFetchSlice=createSlice({
    name:"customerFetchSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerFetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerFetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerFetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerFetchReducer=customerFetchSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { customerDelete } from "../../../Thunk/MasterThunk/Customer/CustomerDeleteThunk";

const customerDltSlice=createSlice({
    name:"customerDltSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerDelete.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerDelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerDelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerDeleteReducer=customerDltSlice.reducer;
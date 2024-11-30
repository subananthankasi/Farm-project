import { createSlice } from "@reduxjs/toolkit";
import { customerCountryState } from "../../../Thunk/MasterThunk/Customer/CustomerCountryStateGetThunk";

const customerCountryStateSlice=createSlice({
    name:"customerCountryStateSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerCountryState.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerCountryState.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerCountryState.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerCountryStateReducer=customerCountryStateSlice.reducer;
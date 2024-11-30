import { createSlice } from "@reduxjs/toolkit";
import { customerCountryDis } from "../../../Thunk/MasterThunk/Customer/CustomerCountryDistrictGetThunk";

const customerCountryDisSlice=createSlice({
    name:"customerCountryDisSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerCountryDis.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerCountryDis.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerCountryDis.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerCountryDisReducer=customerCountryDisSlice.reducer;
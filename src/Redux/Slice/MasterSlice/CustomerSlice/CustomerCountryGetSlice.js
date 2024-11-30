import { createSlice } from "@reduxjs/toolkit";
import { customerCountryGet } from "../../../Thunk/MasterThunk/Customer/CustomerCountryGetThunk";

const customerCountryGetSlice=createSlice({
    name:"customerCountryGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerCountryGet.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerCountryGet.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
            console.log("action.payload",action.payload)
        });
        builder.addCase(customerCountryGet.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerCountryGetReducer=customerCountryGetSlice.reducer;
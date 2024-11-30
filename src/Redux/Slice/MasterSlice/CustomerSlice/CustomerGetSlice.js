import { createSlice } from "@reduxjs/toolkit";
import { customerget} from "../../../Thunk/MasterThunk/Customer/CustomerGetThunk";

const customerGetSlice=createSlice({
    name:"customerGetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerget.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerget.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerget.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerGetReducer=customerGetSlice.reducer;
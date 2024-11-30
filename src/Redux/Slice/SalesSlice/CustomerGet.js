import { createSlice } from "@reduxjs/toolkit";
import { salesCustomerGetThunk } from "../../Thunk/Sales/CustomerGet";

const salesCustomerSlice = createSlice({
    name:'salesCustomerSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesCustomerGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesCustomerGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesCustomerGetThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesCustomerGetReducer = salesCustomerSlice.reducer


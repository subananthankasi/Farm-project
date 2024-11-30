import { createSlice } from "@reduxjs/toolkit";
import { transactionGetThunk } from "../../Thunk/Transaction/TransactionGet";

const transactionGet = createSlice({
    name:'transactionGet',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(transactionGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(transactionGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(transactionGetThunk.rejected ,(state,action)=>{
            state.error = action.payload.message
            state.loading = false

        });
    },
});
export const transactionGetReducer = transactionGet.reducer


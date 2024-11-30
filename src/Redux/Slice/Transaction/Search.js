import { createSlice } from "@reduxjs/toolkit";
import { transactionSearchThunk } from "../../Thunk/Transaction/Search";

const transactionSearch = createSlice({
    name:'transactionSearch',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(transactionSearchThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(transactionSearchThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(transactionSearchThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const transactionSearchReducer = transactionSearch.reducer


import { createSlice } from "@reduxjs/toolkit";
import { ExpensesFetch } from "../../../Thunk/MasterThunk/ExpensesHeadThunk/ExpenFetchThunk";

const expenFetSlice=createSlice({
    name:"expenFetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(ExpensesFetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(ExpensesFetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(ExpensesFetch.rejected,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
    }
});
export const ExpenFetchReducer=expenFetSlice.reducer;
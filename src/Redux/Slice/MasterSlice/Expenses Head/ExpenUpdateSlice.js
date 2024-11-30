import { createSlice } from "@reduxjs/toolkit";
import { Expensesupdate } from "../../../Thunk/MasterThunk/ExpensesHeadThunk/ExpenUpadateThunk";

const expenupdataSlice=createSlice({
    name:"expenupdataSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Expensesupdate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Expensesupdate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Expensesupdate.rejected,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
    }
});
export const ExpenUpdateReducer=expenupdataSlice.reducer;
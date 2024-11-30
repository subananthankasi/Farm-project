import { createSlice } from "@reduxjs/toolkit";
import { Expensescreate } from "../../../Thunk/MasterThunk/ExpensesHeadThunk/ExpenPostThunk";

const expenSlice=createSlice({
    name:"expenSlice",
    initialState:{
        loading:false,
        error:[],
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Expensescreate.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Expensescreate.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Expensescreate.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ExpenCreateReducer=expenSlice.reducer;
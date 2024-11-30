import { createSlice } from "@reduxjs/toolkit";
import { Expensesget } from "../../../Thunk/MasterThunk/ExpensesHeadThunk/ExpenGetThunk";

const expengetSlice=createSlice({
    name:"expengetSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(Expensesget.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(Expensesget.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(Expensesget.rejected,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
    }
});
export const ExpenGetReducer=expengetSlice.reducer;
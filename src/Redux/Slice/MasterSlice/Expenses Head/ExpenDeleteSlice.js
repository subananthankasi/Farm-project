import { createSlice } from "@reduxjs/toolkit";
import { ExpensesDelete } from "../../../Thunk/MasterThunk/ExpensesHeadThunk/ExpenDeleteThunk";

const expendeleteSlice=createSlice({
    name:"expendeleteSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(ExpensesDelete.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(ExpensesDelete.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(ExpensesDelete.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const ExpenDeleteReducer=expendeleteSlice.reducer;
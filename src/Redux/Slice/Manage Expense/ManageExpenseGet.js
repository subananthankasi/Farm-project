import { createSlice } from "@reduxjs/toolkit";
import { manageExpenseGEtThunk } from "../../Thunk/Managae Expense/ManageExpenseGet";

const manageExpenseGet = createSlice({
    name:'manageExpenseGet',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageExpenseGEtThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageExpenseGEtThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageExpenseGEtThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageExpenseGetReducer = manageExpenseGet.reducer
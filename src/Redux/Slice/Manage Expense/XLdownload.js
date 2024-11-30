import { createSlice } from "@reduxjs/toolkit";
import { manageXlThunk } from "../../Thunk/Managae Expense/XLdownload";

const manageXl = createSlice({
    name:'manageXl',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageXlThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageXlThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageXlThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageXlReducer = manageXl.reducer
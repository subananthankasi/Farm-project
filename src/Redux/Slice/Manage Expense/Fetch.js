import { createSlice } from "@reduxjs/toolkit";
import { manageCreateThunk } from "../../Thunk/Managae Expense/Create";

const manageFetch = createSlice({
    name:'manageFetch',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageCreateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageCreateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageCreateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageFetchReducer = manageFetch.reducer
import { createSlice } from "@reduxjs/toolkit";
import { manageDeleteThunk } from "../../Thunk/Managae Expense/Delete";

const manageUpdate = createSlice({
    name:'manageUpdate',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageDeleteThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageDeleteThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageDeleteThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageUpdateReducer = manageUpdate.reducer
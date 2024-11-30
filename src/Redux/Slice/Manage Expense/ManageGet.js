import { createSlice } from "@reduxjs/toolkit";
import { manageGetThunk } from "../../Thunk/Managae Expense/ManageGet";

const manageGet = createSlice({
    name:'manageGet',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageGetReducer = manageGet.reducer
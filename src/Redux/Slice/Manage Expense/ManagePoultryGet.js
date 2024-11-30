import { createSlice } from "@reduxjs/toolkit";
import { managePoultryGetThunk } from "../../Thunk/Managae Expense/ManagePoultryGet";

const managePoultryGet = createSlice({
    name:'managePoultryGet',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(managePoultryGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(managePoultryGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(managePoultryGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const managePoultryGetReducer = managePoultryGet.reducer
import { createSlice } from "@reduxjs/toolkit";
import { manageWordThunk } from "../../Thunk/Managae Expense/WordDownload";

const manageWord = createSlice({
    name:'manageWord',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageWordThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageWordThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageWordThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageWordReducer = manageWord.reducer
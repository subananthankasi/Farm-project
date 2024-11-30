import { createSlice } from "@reduxjs/toolkit";
import { managePoultryGetThunk } from "../../Thunk/Managae Expense/ManagePoultryGet";
import { manageSearchThunk } from "../../Thunk/Managae Expense/SearchManage";

const manageSearch = createSlice({
    name:'manageSearch',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(manageSearchThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(manageSearchThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(manageSearchThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const manageSearchReducer = manageSearch.reducer
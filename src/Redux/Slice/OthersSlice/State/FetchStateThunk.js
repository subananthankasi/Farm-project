import { createSlice } from "@reduxjs/toolkit";
import { deleteStateThunk } from "../../../Thunk/OthersThunk/State/DeleteThunk";
import { fetchStateThunk } from "../../../Thunk/OthersThunk/State/FetchState";

export const fetchStateSlice = createSlice({
    name:'fetchStateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(fetchStateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(fetchStateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(fetchStateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const fetchStateReducer = fetchStateSlice.reducer
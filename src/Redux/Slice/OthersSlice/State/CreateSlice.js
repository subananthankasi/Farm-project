import { createSlice } from "@reduxjs/toolkit";
import { createStateThunk } from "../../../Thunk/OthersThunk/State/CreateThunk";

export const stateCreateSlice = createSlice({
    name:'stateCreateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(createStateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(createStateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(createStateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const stateCreateReducer = stateCreateSlice.reducer
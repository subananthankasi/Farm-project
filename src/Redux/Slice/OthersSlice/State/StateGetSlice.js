import { createSlice } from "@reduxjs/toolkit";
import { StateGetThunk } from "../../../Thunk/OthersThunk/State/StateGetThunk";

export const StateGetSlice = createSlice({
    name:'StateGetSlice',
    initialState:{
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(StateGetThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(StateGetThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
        });
        builder.addCase(StateGetThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const StateGetReducer = StateGetSlice.reducer
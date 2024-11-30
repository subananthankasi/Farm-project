import { createSlice } from "@reduxjs/toolkit";
import { districtCreateThunk } from "../../../Thunk/OthersThunk/District/CreateDistrict";

const districtCreateSlice = createSlice({
    name:'districtCreateSlice',
    initialState:{
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(districtCreateThunk.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(districtCreateThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
        });
        builder.addCase(districtCreateThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const districtCreateReducer = districtCreateSlice.reducer
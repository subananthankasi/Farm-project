import { createSlice } from "@reduxjs/toolkit";
import { salesCreateThunk } from "../../Thunk/Sales/CreateSale";

const salesCreateSlice = createSlice({
    name:'salesCreateSlice',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(salesCreateThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(salesCreateThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
            state.error = null

        });
        builder.addCase(salesCreateThunk.rejected ,(state,action)=>{
            state.error = action.payload
            state.loading = false

        });
    },
});
export const salesCreateReducer = salesCreateSlice.reducer


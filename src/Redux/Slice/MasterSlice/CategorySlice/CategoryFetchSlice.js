import { createSlice } from "@reduxjs/toolkit";
import { catagoryFetch } from "../../../Thunk/MasterThunk/CategoryThunk/CategoryFetchThunk";

const cgFetchSlice=createSlice({
    name:"cgFetchSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(catagoryFetch.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(catagoryFetch.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(catagoryFetch.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        });
    },
});
export const CategoryFetchReducer=cgFetchSlice.reducer;
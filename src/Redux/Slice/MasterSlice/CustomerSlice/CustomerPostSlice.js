import { createSlice } from "@reduxjs/toolkit";
import { customerPost} from "../../../Thunk/MasterThunk/Customer/CustomerPostThunk";


const customerCtSlice=createSlice({
    name:"customerCtSlice",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    extraReducers(builder){
        builder.addCase(customerPost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(customerPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(customerPost.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});
export const customerCreateReducer=customerCtSlice.reducer;
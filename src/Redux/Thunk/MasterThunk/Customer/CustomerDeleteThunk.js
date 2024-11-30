import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const API_URL='http://101.53.155.156:8089/api/customer/delete/'
 
  export const customerDelete=createAsyncThunk("customerDelete/data",
    async(id,{rejectWithValue})=>{
        try{
        const token="BslogiKey" +" "+ localStorage.getItem("form_Token");
        const response=await axios({
            method:"DELETE",
            url:API_URL +id,
            headers:{
                Authorization:token
            },
        });
        return response.data
    }
    catch(error){
        if(error.response){
         return rejectWithValue(error.response.data)
        }
    }
    }

  );
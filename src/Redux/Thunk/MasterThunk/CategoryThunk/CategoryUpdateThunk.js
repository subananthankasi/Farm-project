import { createAsyncThunk } from "@reduxjs/toolkit";
import  axios from "axios";

   const API_URL="http://101.53.155.156:8089/api/category/update"
   
 export const categoryupdate=createAsyncThunk("categoryupdate/data",
    async({id,category,status},{rejectWithValue})=>{
      try{
         const token="BslogiKey" + " " + localStorage.getItem("form_Token")
    const response=await axios({
        method:"PUT",
        url:API_URL,
        headers:{
            Authorization:token
        },
        data:{id,category,status}
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
 
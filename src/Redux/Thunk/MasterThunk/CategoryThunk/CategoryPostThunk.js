import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http://101.53.155.156:8089/api/category/create'

export const categoryPost=createAsyncThunk("categoryPost/data",
    async({id,category,status},{rejectWithValue})=>{
      try{
        const token="BslogiKey" +" "+localStorage.getItem("form_Token");
        const response=await axios({
          method:"POST",
          url:API_URL,
          headers:{
            Authorization:token
          },
        data:{id,category,status}


        });
        console.log(response.data)
      return response.data
      }
      catch(error){
        console.log("errresponse.data",error.response.data)
        
        if(error.response){
          return rejectWithValue(error.response.data);
        }

      }
    }
);
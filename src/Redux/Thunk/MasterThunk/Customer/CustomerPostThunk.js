import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http://101.53.155.156:8089/api/customer/create'

export const customerPost=createAsyncThunk("customerPost/data",
    async({id,name,email,phoneNumber,addressLine,countryId,stateId,districtId,postalCode,status},{rejectWithValue})=>{
      try{
        const token="BslogiKey" +" "+ localStorage.getItem("form_Token");
        const response=await axios({
          method:"POST",
          url:API_URL,
          headers:{
            Authorization:token
          },
        data:{id,name,email,phoneNumber,addressLine,countryId,stateId,districtId,postalCode,status}

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
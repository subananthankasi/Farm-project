import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://101.53.155.156:8089/api/user/create"

export const userCreate=createAsyncThunk("userCreate/data",
    async({id,fullName,email,phoneNo,address,userName,password,userRoleId},{rejectWithValue})=>{
        console.log("payload",id,fullName,email,phoneNo,address,userName,password,userRoleId)
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');
         const response = await axios({
                      method: 'Post',
                      url: API_URL ,
                      headers: {
                                Authorization: token,
                            },
                              
                      data: {id,fullName,email,phoneNo,address,userName,password,userRoleId,
                      }
                  })
                  
                  console.log("response",response.data)

                  return response.data
              }
    catch(error){
        console.log("error",error.response.data)
     if(error.response){
      return rejectWithValue(error.response.data)
     }
    }
    }
)
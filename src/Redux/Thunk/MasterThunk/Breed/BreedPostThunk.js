import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://101.53.155.156:8089/api/breed/create"

export const Breedscreate=createAsyncThunk("Breedscreate/data",
    async({id,breedName,breedTypeId,description},{rejectWithValue})=>{
        console.log("payload",breedName,breedTypeId,description)
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');
         const response = await axios({
                      method: 'Post',
                      url: API_URL ,
                      headers: {
                                Authorization: token,
                            },
                              
                      data: {id,breedName,breedTypeId,description}
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
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://101.53.155.156:8089/api/product/create"

export const productCreate=createAsyncThunk("productCreate/data",
    async({id,productName,categoryId,quantity,price,poultryId,breedId,status},{rejectWithValue})=>{
        console.log("payload",id,productName,categoryId,quantity,price,poultryId,breedId,status)
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');
         const response = await axios({

                      method: 'Post',
                      url: API_URL ,
                      headers: {
                                Authorization: token,
                            },
                              
                      data:{id,productName,categoryId,quantity,price,poultryId,breedId,status}
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
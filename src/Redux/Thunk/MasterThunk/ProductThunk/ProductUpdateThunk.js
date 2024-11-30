import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL='http://101.53.155.156:8089/api/product/update'

export const productUpdate=createAsyncThunk('productUpdate/data',
    async({id,productName,categoryId,quantity,price,poultryId,breedId,status},{rejectWithValue})=>{
        console.log("async",id,productName,categoryId,quantity,price)
        try{
        const  token='BslogiKey' +' ' + localStorage.getItem('form_Token');

        const response=await axios({
        method:"PUT",
        url:API_URL,
        headers:{
            Authorization:token
        },
        data:{id,productName,categoryId,quantity,price,poultryId,breedId,status}
        });
        console.log("response.data",response.data)
        return response.data;
    }catch(error){
        if(error.response){
            return rejectWithValue(error.response.data)

        }
    }
        
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://101.53.155.156:8089/api/category/delete/"


export const categorydelete=createAsyncThunk("categorydelete/data",
    async(id,{rejectWithValue})=>{
        console.log("iddele",id)
        try{
        const token="BslogiKey" +' '+ localStorage.getItem('form_Token');
        const response=await axios({
            method:"DELETE",
            url:API_URL +id,
            headers:{
                Authorization:token
            },
        });
        console.log("responsecate",response.data)
        return response.data;
    }
    catch(error){
        console.log("error.response.data",error.response.data)
        if(error.response){
            return rejectWithValue(error.response.data)
        }
    }
    }
);
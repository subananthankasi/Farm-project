import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL='http://101.53.155.156:8089/auth/user-details'

export const userProfileGet=createAsyncThunk('userProfileGet/data',
    async()=>{
        const  token='BslogiKey' + ' ' +  localStorage.getItem('form_Token');
        const response=await axios({
        method:"GET",
        url:API_URL,
        headers:{
            Authorization:token,
        },
        });
        return response.data;
        
    }
);
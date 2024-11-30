import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL='http://101.53.155.156:8089/api/user/get/'

export const userProfileFetch=createAsyncThunk('userProfileFetch/data',
    async({userId})=>{
        console.log('uppppppserId')
        const  token='BslogiKey' + ' ' + localStorage.getItem('form_Token');
        const response=await axios({
        method:"GET",
        url:API_URL +userId,
        headers:{
            Authorization:token,
        },
        });
        return response.data;
        
    }
);
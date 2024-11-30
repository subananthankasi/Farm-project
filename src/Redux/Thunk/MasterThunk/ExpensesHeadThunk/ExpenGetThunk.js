import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://101.53.155.156:8089/api/expense/get"

export const Expensesget=createAsyncThunk("Expensesget/data",
    async()=>{
    
        const token="BslogiKey" + " "+ localStorage.getItem("form_Token");
        console.log("token",token)
        const response=await axios({
            method:"GET",
            url:API_URL,
            headers:{
                Authorization:token
            },
            
        })
        return response.data
    }
)
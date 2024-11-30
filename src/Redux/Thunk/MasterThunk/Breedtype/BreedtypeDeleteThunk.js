import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 const API_URL='http://101.53.155.156:8089/api/breedtype/delete/'

 export const BreedtypeDelete=createAsyncThunk('BreedtypeDelete/data',
    async(id,{rejectWithValue})=>{
        console.log("ides",id)
        try{
        const token='BslogiKey' +' ' + localStorage.getItem('form_Token');
        const response=await axios({
            method:"DELETE",
            url:API_URL +id,
            headers:{
           Authorization:token
            },
        });
        console.log("response",response)
    
        return response.data;
    }
    catch(error){
        console.log("ersss",error.response.data)
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        else {
            return rejectWithValue({ message: 'An unexpected error occurred' });
        }
    }
    }
 );
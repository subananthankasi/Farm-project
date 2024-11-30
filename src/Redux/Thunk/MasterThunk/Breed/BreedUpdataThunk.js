import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL='http://101.53.155.156:8089/api/breed/update'

export const BreedUpdate=createAsyncThunk('BreedUpdate/data',
    async({id,breedTypeId,breedName,description},{rejectWithValue})=>{
        console.log()
        try{
        const  token='BslogiKey' +' ' + localStorage.getItem('form_Token');
        const response=await axios({
        method:"PUT",
        url:API_URL,
        headers:{
            Authorization:token
        },
        data:{id,breedTypeId,breedName,description}

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
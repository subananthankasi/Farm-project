import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  POULTRY_BREED_DELETE } from "../../Environment/Environment";

const API_URL = POULTRY_BREED_DELETE

export const poultryBreedDeleteThunk = createAsyncThunk('poultryBreedDeleteThunk/data',
    async (id,{rejectWithValue}) => {
        try{
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'delete',
            url: API_URL+id,
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
    catch(error){
        if(error.response){
           return rejectWithValue(error.response.data)
        }
    }
    }
);

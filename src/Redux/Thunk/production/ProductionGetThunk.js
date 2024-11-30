import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTION_GET_URL } from "../../Environment/Environment";

const API_URL= PRODUCTION_GET_URL

export const productionGetThunk = createAsyncThunk('productionGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios ({
            method:'get',
            url:API_URL,
            headers:{
                Authorization:token
            }
        })
        // await new Promise(resolve => setTimeout(resolve, 1000));
        return response.data
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTION_POULTRY_GET } from "../../Environment/Environment";

const API_URL= PRODUCTION_POULTRY_GET

export const productionPoultryGetThunk = createAsyncThunk('productionPoultryGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios ({
            method:'get',
            url:API_URL,
            headers:{
                Authorization:token
            }
        })
        return response.data
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {PRODUCTION_BREED_GET} from "../../Environment/Environment";

const API_URL= PRODUCTION_BREED_GET

export const productionUpdateBreedGetThunk = createAsyncThunk('productionUpdateBreedGetThunk/data',
    async (poultryId) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios ({
            method:'get',
            url:API_URL+poultryId,
            headers:{
                Authorization:token
            }
        })
        return response.data
    }
)
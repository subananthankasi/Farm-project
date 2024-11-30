import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTION_CATEGORY_GET } from "../../Environment/Environment";

const API_URL= PRODUCTION_CATEGORY_GET

export const productionCategoryThunk = createAsyncThunk('productionCategoryThunk/data',
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
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  SALES_PRODUCT_GET } from "../../Environment/Environment";

const API_URL = SALES_PRODUCT_GET

export const salesProductGetThunk = createAsyncThunk('salesProductGetThunk/data',
    async (id) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'get',
            url: API_URL+id,
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
);

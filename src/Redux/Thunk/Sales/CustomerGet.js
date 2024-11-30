import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  SALES_CUSTOMER_GET } from "../../Environment/Environment";

const API_URL = SALES_CUSTOMER_GET

export const salesCustomerGetThunk = createAsyncThunk('salesCustomerGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'get',
            url: API_URL,
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
);

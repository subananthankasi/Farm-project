import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  TRANSACTION_SEARCH_URL } from "../../Environment/Environment";

const API_URL = TRANSACTION_SEARCH_URL

export const transactionSearchThunk = createAsyncThunk('transactionSearchThunk/data',
    async (values) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'get',
            url: API_URL,
            headers: {
                Authorization: token,
            },
            params:values
        });

      

        return response.data;
    }
);

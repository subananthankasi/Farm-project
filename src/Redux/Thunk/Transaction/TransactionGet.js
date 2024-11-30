import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { TRANSACTION_GET_URL } from "../../Environment/Environment";

const API_URL = TRANSACTION_GET_URL

export const transactionGetThunk = createAsyncThunk('transactionGetThunk/data',
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

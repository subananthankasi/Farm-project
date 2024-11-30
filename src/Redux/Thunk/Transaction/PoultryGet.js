import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { TRANSACTION_POULTRY_GET } from "../../Environment/Environment";

const API_URL = TRANSACTION_POULTRY_GET

export const transPoultryGetThunk = createAsyncThunk('tranPoultryGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'get',
            url: API_URL,
            headers: {
                Authorization: token,
            },
        });

        // await new Promise(resolve => setTimeout(resolve, 2000));

        return response.data;
    }
);

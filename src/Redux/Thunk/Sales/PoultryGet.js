import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  SALES_POULTRY_GET } from "../../Environment/Environment";

const API_URL = SALES_POULTRY_GET

export const salesPoultryGetThunk = createAsyncThunk('salesPoultryGetThunk/data',
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

import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { COUNTRY_GET } from "../../../Environment/Environment";

const API_URL = COUNTRY_GET

export const countryGetThunk = createAsyncThunk('countryGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'get',
            url: API_URL,
            headers: {
                Authorization: token,
            },
        });

        // await new Promise(resolve => setTimeout(resolve, 1000));

        return response.data;
    }
);

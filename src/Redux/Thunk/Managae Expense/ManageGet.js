import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { MANAGE_GET_URL } from "../../Environment/Environment";

const API_URL = MANAGE_GET_URL

export const manageGetThunk = createAsyncThunk('manageGetThunk/data',
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

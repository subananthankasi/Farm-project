import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { POULTRY_BREED_INSIDE_DELETE } from "../../Environment/Environment";

const API_URL = POULTRY_BREED_INSIDE_DELETE

export const insideDeletePoultryThunk = createAsyncThunk('insideDeletePoultryThunk/data',
    async (id) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method: 'delete',
            url: API_URL+id,
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
);

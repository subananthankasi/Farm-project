import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  POULTRY_BREED_BREED_GET } from "../../Environment/Environment";

const API_URL = POULTRY_BREED_BREED_GET

export const poultryBreed_BreedGetThunk = createAsyncThunk('poultryBreed_BreedGetThunk/data',
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

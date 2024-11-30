import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {  POULTRY_BREED_FETCH } from "../../Environment/Environment";

const API_URL = POULTRY_BREED_FETCH

export const poultryBreedFetchThunk = createAsyncThunk('poultryBreedFetchThunk/data',
    async ({id}) => {
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

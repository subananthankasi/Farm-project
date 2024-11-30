import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DISTRICT_COUNTRY_GET } from "../../../Environment/Environment";

const API_URL= DISTRICT_COUNTRY_GET

export const districtCountryGetThunk = createAsyncThunk('districtCountryGet/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios ({
            method:'get',
            url:API_URL,
            headers:{
                Authorization:token
            }
        })
        return response.data
    }
)
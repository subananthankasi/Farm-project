import { createAsyncThunk } from "@reduxjs/toolkit";
import { DISTRICT_GET_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = DISTRICT_GET_URL

export const districtGetThunk = createAsyncThunk('districtGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method:'get',
            url:API_URL,
            headers :{
                Authorization:token
            },
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        return response.data
    }
)

import { createAsyncThunk } from "@reduxjs/toolkit";
import { DISTRICT_STATE_GET } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = DISTRICT_STATE_GET

export const districtStateGetThunk = createAsyncThunk('districtStateGetThunk/data',
    async (id) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method:'get',
            url:API_URL+id,
            headers :{
                Authorization:token
            },
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
        return response.data
    }
)

import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATE_CREATE_COUNTRY_GET } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = STATE_CREATE_COUNTRY_GET

export const stateCreateGetThunk = createAsyncThunk('stateCreateGetThunk/data',
    async () => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios({
            method:'get',
            url:API_URL,
            headers :{
                Authorization:token
            },
        })
        return response.data
    }
)

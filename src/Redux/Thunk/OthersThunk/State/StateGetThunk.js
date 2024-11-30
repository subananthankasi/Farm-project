import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATE_GET_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = STATE_GET_URL

export const StateGetThunk = createAsyncThunk('StateGetThunk/data',
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

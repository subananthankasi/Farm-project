import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {PRODUCTION_UPDATE_GET } from "../../Environment/Environment";

const API_URL= PRODUCTION_UPDATE_GET

export const productionUpdateGetThunk = createAsyncThunk('productionUpdateGet/data',
    async ({id}) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios ({
            method:'get',
            url:API_URL+id,
            headers:{
                Authorization:token
            }
        })
        // await new Promise(resolve => setTimeout(resolve, 1000));

        return response.data
    }
)
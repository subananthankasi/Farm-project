import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {PRODUCTION_DELETE_URL } from "../../Environment/Environment";

const API_URL= PRODUCTION_DELETE_URL

export const productionDeleteThunk = createAsyncThunk('productionDeleteThunk/data',
    async (id) => {
        const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
        const response = await axios ({
            method:'delete',
            url:API_URL+id,
            headers:{
                Authorization:token
            }
        })
        // await new Promise(resolve => setTimeout(resolve, 700));
        
        return response.data
    }
)
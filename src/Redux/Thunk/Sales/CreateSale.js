import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  SALES_CREATE_URL } from "../../Environment/Environment";


const API_URL = SALES_CREATE_URL

export const salesCreateThunk = createAsyncThunk('salesCreateThunk/data',
    async (values, { rejectWithValue }) => {
   
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'post',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                data:values
            })
            // await new Promise(resolve => setTimeout(resolve, 1000));
            return response.data
        }
        catch (error) {
            if (error.response) {
                console.log("Api error :", error.response.data.error.reason)
                return rejectWithValue({ reason: error.response.data.error.reason});
            }
            else {
                return rejectWithValue({ reason: 'An unexpected error occurred: ' + error.message });
            }
        }
    }

)
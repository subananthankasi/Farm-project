import { createAsyncThunk } from "@reduxjs/toolkit";
import { COUNTRY_FETCH_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = COUNTRY_FETCH_URL

export const countryFetchThunk = createAsyncThunk('countryFetchThunk/data',
    async ({id},{ rejectWithValue }) => {
      
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'get',
                url: API_URL + id,
                headers: {
                    Authorization: token
                }
            })
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue({ reason: error })
            }
            else {
                return rejectWithValue({ reason: 'An unexpected error:' + error.message })
            }
        }
    }
)
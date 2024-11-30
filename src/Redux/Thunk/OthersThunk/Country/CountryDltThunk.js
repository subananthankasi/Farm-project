import { createAsyncThunk } from "@reduxjs/toolkit";
import { COUNTRY_DELETE_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = COUNTRY_DELETE_URL

export const countryDeleteThunk = createAsyncThunk('countryDeleteThunk/data',
    async (countryDltId,{ rejectWithValue }) => {
        // console.log('countryDltId',countryDltId)
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'delete',
                url: API_URL + countryDltId,
                headers: {
                    Authorization: token
                }
            })
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }
)
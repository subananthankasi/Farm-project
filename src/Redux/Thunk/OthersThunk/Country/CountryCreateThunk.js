import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COUNTRY_CREATE } from "../../../Environment/Environment";


const API_URL = COUNTRY_CREATE

export const countryCreateThunk = createAsyncThunk('countryCreateThunk/data',
    async ({countryCode,id,name,shortName,status}, { rejectWithValue }) => {
        // console.log({countryCode,id,name,shortName,status})
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'post',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                data: {countryCode,id,name,shortName,status}
            })
            await new Promise(resolve => setTimeout(resolve, 1000));
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
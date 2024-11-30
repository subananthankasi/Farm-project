import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FORGOT_PASSWORD } from "../Environment/Environment";

const API_URL = FORGOT_PASSWORD

export const forgotThunk = createAsyncThunk('forgotThunk/data',
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'put',
                url: API_URL ,
                data: values
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
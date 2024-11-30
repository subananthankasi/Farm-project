import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL } from "../Environment/Environment";

const API_URL = LOGIN_URL

export const LoginThunk = createAsyncThunk('LoginThunk/data',
    async ({ userName, password }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'Post',
                url: API_URL ,
                data: { userName, password }
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
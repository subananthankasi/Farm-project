import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTION_BREED_GET } from "../../Environment/Environment";

const API_URL = PRODUCTION_BREED_GET

export const productionBreedGetThunk = createAsyncThunk('productionBreedGetThunk/data',
    async (id, { rejectWithValue }) => {
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method:'get',
                url:API_URL+id,
                headers:{
                    Authorization:token
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
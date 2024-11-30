import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTION_CREATE_URL } from "../../Environment/Environment";


const API_URL = PRODUCTION_CREATE_URL

export const productionCreateThunk = createAsyncThunk('productionCreateThunk/data',
    async ({ breedId, categoryId, count, date, expiryDate, id, poultryId, price }, { rejectWithValue }) => {
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'post',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                data: { breedId, categoryId, count, date, expiryDate, id, poultryId, price }
            })
            await new Promise(resolve => setTimeout(resolve, 1000));
            return response.data
        }
        catch (error) {
            if (error.response) {
                console.log("error", error.response.data.error.reason)
                return rejectWithValue({ reason: error.response.data.error.reason });



            }
            else {
                return rejectWithValue({ reason: 'An unexpected error occurred: ' + error.message });
            }
        }
    }

)
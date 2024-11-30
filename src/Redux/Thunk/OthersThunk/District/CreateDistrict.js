import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DISTRICT_CREATE_URL } from "../../../Environment/Environment";


const API_URL = DISTRICT_CREATE_URL

export const districtCreateThunk = createAsyncThunk('districtCreateThunk/data',
    async ({countryId,districtName,id,shortName,stateId}, { rejectWithValue }) => {
        // console.log({countryId,districtName,id,shortName,stateId})
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'post',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                data: {countryId,districtName,id,shortName,stateId}
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
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MANAGE_SEARCH_URL } from "../../Environment/Environment";


const API_URL = MANAGE_SEARCH_URL

export const manageSearchThunk = createAsyncThunk('manageSearchThunk/data',
    async ({poultryName,startDate,endDate}, { rejectWithValue }) => {
   
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
             console.log("Request Params: ", { poultryName, startDate, endDate });
            const response = await axios({
                method: 'get',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                params:{poultryName,startDate,endDate}
            
              
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
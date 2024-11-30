import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MANAGE_WORD_DOWNLOAD } from "../../Environment/Environment";


const API_URL = MANAGE_WORD_DOWNLOAD

export const manageWordThunk = createAsyncThunk('manageWordThunk/data',
    async ({poultryName,startDate,endDate}, { rejectWithValue }) => {
   
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
    
            const response = await axios({
                method: 'get',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                params:{poultryName,startDate,endDate},
                responseType: 'blob',  
            
              
            })
            
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
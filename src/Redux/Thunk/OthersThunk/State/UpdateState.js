import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATE_UPDATE_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = STATE_UPDATE_URL    

export const updateStateThunk = createAsyncThunk('updateStateThunk/data',
    async ( payload, {rejectWithValue }) => {
        // console.log('payloadUpdate',payload)
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'put',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                data:payload
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
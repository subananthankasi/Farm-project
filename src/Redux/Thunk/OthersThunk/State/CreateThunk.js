import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATE_CREATE_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = STATE_CREATE_URL    

export const createStateThunk = createAsyncThunk('createStateThunk/data',
    async ( {countryId,id,shortName,stateName,status}, {rejectWithValue }) => {
        // console.log('payload',{countryId,id,shortName,stateName,status})
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'post',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                data:{countryId,id,shortName,stateName,status}
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
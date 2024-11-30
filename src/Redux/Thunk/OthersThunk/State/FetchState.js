import { createAsyncThunk } from "@reduxjs/toolkit";
import {STATE_DELETE_URL, STATE_FETCH_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = STATE_FETCH_URL    

export const fetchStateThunk = createAsyncThunk('fetchStateSlice/data',
    async ( {id}, {rejectWithValue }) => {
    
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'GET',
                url: API_URL+id,
                headers: {
                    Authorization: token
                },
              
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
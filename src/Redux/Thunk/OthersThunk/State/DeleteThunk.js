import { createAsyncThunk } from "@reduxjs/toolkit";
import {STATE_DELETE_URL } from "../../../Environment/Environment";
import axios from "axios";

const API_URL = STATE_DELETE_URL    

export const deleteStateThunk = createAsyncThunk('deleteStateThunk/data',
    async ( stateDltId, {rejectWithValue }) => {
        // console.log('stateDltId',stateDltId)
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'delete',
                url: API_URL+stateDltId,
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
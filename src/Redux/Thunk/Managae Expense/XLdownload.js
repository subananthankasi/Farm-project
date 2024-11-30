import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://101.53.155.156:8089/api/manage/print/view/xl?';

export const manageXlThunk = createAsyncThunk(
  'manageXlThunk/data',
  async (values, { rejectWithValue }) => {
    try {
      const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');
      const response = await axios({
        method: 'get',
        url: API_URL,
        headers: {
          Authorization: token,
        },
        params: values,
        responseType: 'blob', 
      });
      
      return response.data; 
    } catch (error) {
      if (error.response) {
        console.log("Api error:", error.response.data.error.reason);
        return rejectWithValue({ reason: error.response.data.error.reason });
      } else {
        return rejectWithValue({
          reason: 'An unexpected error occurred: ' + error.message,
        });
      }
    }
  }
);

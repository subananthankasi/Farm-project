import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SALES_XL_DOWNLOAD } from "../../Environment/Environment";

const API_URL = SALES_XL_DOWNLOAD;

export const salesXlThunk = createAsyncThunk('salesXlThunk/data',
  async ({id}, { rejectWithValue }) => {
    try {
      const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');
      const response = await axios({
        method: 'get',
        url: API_URL+id,
        headers: {
          Authorization: token,
        },
       
        responseType: 'blob', 
      });
      
      return response.data; 
    } 
    catch (error) {
      if (error.response) {
        console.log("Api error:", error.response.data.error.reason);
        return rejectWithValue({ reason: error.response.data.error.reason });
      }
       else {
        return rejectWithValue({
          reason: 'An unexpected error occurred: ' + error.message,
        });
      }
    }
  }
);

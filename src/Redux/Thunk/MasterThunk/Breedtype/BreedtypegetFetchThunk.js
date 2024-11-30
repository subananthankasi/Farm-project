import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL='http://101.53.155.156:8089/api/breedtype/get/'

export const BreedtypeFetchGet = createAsyncThunk(
  "BreedtypeFetchGet/data",
  async (id) => {
    console.log("id",id)
    const token = "BslogiKey" + " " + localStorage.getItem("form_Token");
    const response = await axios({
      method: "GET",
      url: API_URL+id,
      headers: {
        
        Authorization: token,
      },
      
    });
    return response.data;
  }
);
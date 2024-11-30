import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { POULTRY_SEARCH_URL } from "../../Environment/Environment";


const API_URL = POULTRY_SEARCH_URL

export const poultryBreedSearchThunk = createAsyncThunk('poultryBreedSearchThunk/data',
    async (poultryName) => {
   
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            //  console.log("Request Params: ",searchData);
            const response = await axios({
                method: 'get',
                url: API_URL,
                headers: {
                    Authorization: token
                },
                params:{poultryName}
            
              
            })
            // await new Promise(resolve => setTimeout(resolve, 1000));
            return response.data
        
      
    }

)
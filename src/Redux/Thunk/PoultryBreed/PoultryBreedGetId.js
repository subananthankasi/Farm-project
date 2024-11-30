import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { POULTRY_BREED_POULTRYID_GET } from "../../Environment/Environment";


const API_URL = POULTRY_BREED_POULTRYID_GET

export const poultryBreedPoultryIdGetThunk = createAsyncThunk('poultryBreedPoultryIdGetThunk/data',
    async (selectedPoultryId) => {
//    console.log('selectedPoultryId',selectedPoultryId)
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method: 'get',
                url: API_URL+selectedPoultryId,
                headers: {
                    Authorization: token
                },
               
            
              
            })
            // await new Promise(resolve => setTimeout(resolve, 1000));
            return response.data
        
      
    }

)
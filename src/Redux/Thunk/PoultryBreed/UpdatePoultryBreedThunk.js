import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { POULTRY_BREED_UPDATE } from "../../Environment/Environment";


const API_URL = 'http://101.53.155.156:8089/api/poultrybreed/update'

export const poultryBreedUpdateThunkData = createAsyncThunk('poultryBreedUpdateThunkData/data',
    async (payload, { rejectWithValue }) => {
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
            // console.log('response',response)

            // await new Promise(resolve => setTimeout(resolve, 1000));
            return response.data
        }
        catch (error) {
            if (error.response) {
                console.log("error", error.response.data)
                return rejectWithValue({ reason: error.response.data.error.reason });



            }
            else {
                return rejectWithValue({ reason: 'An unexpected error occurred: ' + error.message });
            }
        }
    }

)
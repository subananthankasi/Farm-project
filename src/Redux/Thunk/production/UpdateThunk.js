// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


//  const PRODUCTION_UPDATE_URL = 'http://101.53.155.156:8089/api/production/update'

// export const productionUpdateThunk = createAsyncThunk('productionUpdateThunk/data',
//     async (payload) => {
//         // console.log('payloadeeee',payload)
//         const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
//         const response = await axios ({
//             method:'put',
//             url:PRODUCTION_UPDATE_URL,
//             headers:{
//                 Authorization:token
//             },
//             data:payload
//         })
//         return response.data
//     }
// )


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


 const PRODUCTION_UPDATE_URL = 'http://101.53.155.156:8089/api/production/update'

export const productionUpdateThunk = createAsyncThunk('productionUpdateThunk/data',
    async (payload, { rejectWithValue }) => {
        try {
            const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token')
            const response = await axios({
                method:'put',
                url:PRODUCTION_UPDATE_URL,
                headers:{
                    Authorization:token
                },
                data:payload
            })
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }

)
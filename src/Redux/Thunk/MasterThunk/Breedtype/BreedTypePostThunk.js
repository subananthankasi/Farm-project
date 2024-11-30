import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const API_URL = 'http://101.53.155.156:8089/api/breedtype/create'

// export const BreedtypeCreate = createAsyncThunk(
//   "Breedtype/create",
//   async ({breedType}) => {
//     console.log("breedType",breedType)
//         const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');
        
//     const response = await axios({
//       method: "POST",
//       url: API_URL,
//       headers: {
//         Authorization: token,
//       },
      
//     });
//     return response.data;

//   }
// );
export const BreedtypeCreate = createAsyncThunk('BreedtypeCreate/data',
  async ({id, breedType }, { rejectWithValue }) => {   
      try {
    const token = 'BslogiKey' + ' ' + localStorage.getItem('form_Token');

          const response = await axios({
              method: 'Post',
              url: API_URL ,
              headers: {
                        Authorization: token,
                    },
                      
              data: { id,breedType }
          })
          return response.data
      }
      catch (error) {
        console.log("err",error);
        console.log("errt",error.response.data);
        
          if (error.response) {
              return rejectWithValue(error.response.data);
          }
        //   else {
        //       return rejectWithValue({ message: 'An unexpected error occurred' });
        //   }
      }
  }

)
import { createSlice } from "@reduxjs/toolkit";
import { Breedtypeget } from "../../../Thunk/MasterThunk/Breedtype/BreedtypeGetThunk";


const BreedtypegetSlice = createSlice({

    name: "BreedtypegetSlice",
    initialState: {
        loading: false,
        error: null,
        data: [],
    },
    extraReducers(builder) {
        builder.addCase(Breedtypeget.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(Breedtypeget.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            console.log("state.loading", state.loading)


            console.log("state.loading", action.payload)

        });
        builder.addCase(Breedtypeget.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        });
    },

});
export const GetReducer = BreedtypegetSlice.reducer;
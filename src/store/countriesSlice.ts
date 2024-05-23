import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import countriesService from "../services/countries";
import { Country } from "../types/country";

export const initializeCountries = () => {
  return async (dispatch: Dispatch) => {
    try {
      const countries: Country[] = await countriesService.getAll();
      dispatch(getCountries(countries));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true,
  },
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { getCountries, isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;

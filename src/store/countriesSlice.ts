import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import countriesService from "../services/countries";
import { Country } from "../types/country";
import { AppDispatch } from "./store";

export const initializeCountries = () => {
  return async (dispatch: Dispatch) => {
    const countries: Country[] = await countriesService.getAll();
    dispatch(getCountries(countries));
    setTimeout(() => {
      dispatch(isLoading(false));
    }, 1000);
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
      state.isLoading = false;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { getCountries, isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;

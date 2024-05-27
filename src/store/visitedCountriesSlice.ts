import { createSlice } from "@reduxjs/toolkit";
import { clearVisitedCountriesFromFirebase } from "../auth/firebase";
import { Country } from "../types/country";

export const visitedCountriesSlice = createSlice({
  name: "visitedCountries",
  initialState: {
    visitedCountries: [] as Country[],
  },
  reducers: {
    getVisitedCountries(state, action) {
      state.visitedCountries = action.payload;
    },
    // Check if payload exists in the state and add it to the state. If user is logged in, add it to the database.
    addVisitedCountries(state, action) {
      if (
        !state.visitedCountries.some(
          (countryName) => countryName === action.payload
        )
      ) {
        const updatedVisitedCountries = [
          ...state.visitedCountries,
          action.payload,
        ];
        state.visitedCountries = updatedVisitedCountries;
      }
    },
    clearVisitedCountries(state, action) {
      if (state.visitedCountries.length !== 0) {
        state.visitedCountries = [];
        clearVisitedCountriesFromFirebase(action.payload);
      }
    },
    // Find the index of payload and remove it from the state.
    removeVisitedCountries(state, action) {
      const newArray = [...state.visitedCountries];
      newArray.splice(
        newArray.findIndex((element) => element === action.payload),
        1
      );
      state.visitedCountries = [...newArray];
    },
  },
});

export const {
  getVisitedCountries,
  addVisitedCountries,
  clearVisitedCountries,
  removeVisitedCountries,
} = visitedCountriesSlice.actions;

export default visitedCountriesSlice.reducer;

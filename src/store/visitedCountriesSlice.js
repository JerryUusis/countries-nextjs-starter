import { createSlice } from "@reduxjs/toolkit";
import {
  clearVisitedCountriesFromFirebase,
} from "../auth/firebase"

export const visitedCountriesSlice = createSlice({
  name: "visitedCountries",
  initialState: {
    visitedCountries: [],
    alertMessage: "",
    alertSeverity: "success",
    alertVisible: false
  },
  reducers: {
    getVisitedCountries(state, action) {
      state.visitedCountries = action.payload;
    },
    // Check if payload exists in the state and add it to the state. If user is logged in, add it to the database.
    addVisitedCountries(state, action) {
      if (!state.visitedCountries.some((countryName) => countryName === action.payload)) {
        const updatedVisitedCountries = [...state.visitedCountries, action.payload];
        state.visitedCountries = updatedVisitedCountries;
        state.alertMessage = `Added ${action.payload} to visited countries`;
        state.alertSeverity = "success";
        state.alertVisible = true;
      }
    },
    clearVisitedCountries(state, action) {
      if (state.visitedCountries.length !== 0) {
        state.visitedCountries = [];
        clearVisitedCountriesFromFirebase(action.payload);
        state.alertMessage = "Visited countries cleared";
        state.alertSeverity = "success";
        state.alertVisible = true;
      } else {
        state.alertMessage = "Visited countries already cleared";
        state.alertSeverity = "info";
        state.alertVisible = true;
      }
    },
    // Find the index of payload and remove it from the state.
    removeVisitedCountries(state, action) {
      const newArray = [...state.visitedCountries];
      newArray.splice(
        newArray.findIndex((element) => element === action.payload), 1);
      state.visitedCountries = [...newArray];
      state.alertMessage = `Removed ${action.payload} from visited countries`;
      state.alertSeverity = "success";
      state.alertVisible = true;
    },
    turnInvisible(state, action) {
      state.alertVisible = action.payload;
    },
    updateAlertProps(state, action) {
      state.alertMessage = action.payload.message;
      state.alertSeverity = action.payload.severity;
      state.alertVisible = action.payload.visible;
    }
  },
});

export const { getVisitedCountries, addVisitedCountries, clearVisitedCountries, removeVisitedCountries, turnInvisible, updateAlertProps } =
  visitedCountriesSlice.actions;

export default visitedCountriesSlice.reducer;

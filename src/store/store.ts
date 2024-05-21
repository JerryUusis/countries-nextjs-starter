import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import visitedCountriesReducer from "./visitedCountriesSlice";
import alertReducer from "./alertSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    visitedCountries: visitedCountriesReducer,
    alert: alertReducer,
  },
});

// Represents the dispatch function of the Redux store
export type AppDispatch = typeof store.dispatch;

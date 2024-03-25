import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import visitedCountriesReducer from "./visitedCountriesSlice"



export default configureStore({
    reducer: {
        countries: countriesReducer,
        visitedCountries: visitedCountriesReducer
    }
})
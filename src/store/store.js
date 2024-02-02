import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";

import favouriteReducer from "./favouritesSlice"



export default configureStore({
    reducer: {
        countries: countriesReducer,
        favourites: favouriteReducer
    }
})
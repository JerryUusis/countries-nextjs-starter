import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteToFirebase, auth
} from "../auth/firebase"

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
      if (state.favourites.some((favourite) => favourite === action.payload))
        state.favourites = [...state.favourites];
      state.favourites = [...state.favourites, action.payload];

      const user = auth.currentUser;
      if (user) addFavouriteToFirebase(user.uid, action.payload);
    },
    clearFavourites(state, action) {
      state.favourites = [];
    },
    removeFavourite(state, action) {
      return {
        ...state,
        favourites: state.favourites.filter(
          (country) => country.name.common !== action.payload
        ),
      };
    },
  },
});

export const { addFavourite, clearFavourites, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;

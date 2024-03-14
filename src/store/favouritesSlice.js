import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteToFirebase,
  removeFavouriteFromFirebase,
  clearFavouritesFromFirebase,
  auth
} from "../auth/firebase"

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    // Check if payload exists in the state and add it to the state. If user is logged in, add it to the database.
    addFavourite(state, action) {
      if (!state.favourites.some((fav) => fav === action.payload)) {
        state.favourites = [...state.favourites, action.payload];
        const user = auth.currentUser;
        if (user) addFavouriteToFirebase(user.uid, action.payload);
      }
    },
    clearFavourites(state, action) {
      state.favourites = [];
      clearFavouritesFromFirebase(action.payload);
    },
    // Find the index of payload and remove it from the state. If user is logged, remove it from the database.
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((element) => element === action.payload), 1);
      state.favourites = [...newArray];

      const user = auth.currentUser;
      if (user) {
        removeFavouriteFromFirebase(user.uid, action.payload)
      }
    },
  },
});

export const { getFavourites, addFavourite, clearFavourites, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;

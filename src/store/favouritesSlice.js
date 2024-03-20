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
    alertMessage: "",
    alertSeverity: "success",
    alertVisible: false
  },
  reducers: {
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    // Check if payload exists in the state and add it to the state. If user is logged in, add it to the database.
    addFavourite(state, action) {
      if (!state.favourites.some((fav) => fav === action.payload)) {
        try {
          state.favourites = [...state.favourites, action.payload];
          const user = auth.currentUser;
          if (user) addFavouriteToFirebase(user.uid, action.payload);
          state.alertMessage = `Added ${action.payload} to favourites`;
          state.alertSeverity = "success";
          state.alertVisible = true;
        } catch (error) {
          state.alertMessage = error;
          state.alertSeverity = "error";
          state.alertVisible = true;
        }
      }
    },
    clearFavourites(state, action) {
      if (state.favourites.length !== 0) {
        state.favourites = [];
        clearFavouritesFromFirebase(action.payload);
        state.alertMessage = "Favourites cleared";
        state.alertSeverity = "success";
        state.alertVisible = true;
      } else {
        state.alertMessage = "Favourites already cleared";
        state.alertSeverity = "info";
        state.alertVisible = true;
      }
    },
    // Find the index of payload and remove it from the state. If user is logged, remove it from the database.
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      try {
        newArray.splice(
          newArray.findIndex((element) => element === action.payload), 1);
        state.favourites = [...newArray];

        const user = auth.currentUser;
        if (user) {
          removeFavouriteFromFirebase(user.uid, action.payload);
          state.alertMessage = `Removed ${action.payload} from favourites`;
          state.alertSeverity = "success";
          state.alertVisible = true;
        }
      } catch (error) {
        state.alertMessage = `Error removing from ${action.payload}: ${error}`;
        state.alertSeverity = "error";
        state.alertVisible = true;
      }
    },
    turnInvisible(state, action) {
      state.alertVisible = action.payload;
    }
  },
});

export const { getFavourites, addFavourite, clearFavourites, removeFavourite, turnInvisible } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;

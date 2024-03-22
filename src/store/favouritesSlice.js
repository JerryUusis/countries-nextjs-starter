import { createSlice } from "@reduxjs/toolkit";
import {
  clearFavouritesFromFirebase,
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
        const updatedFavourites = [...state.favourites, action.payload];
        state.favourites = updatedFavourites;
        state.alertMessage = `Added ${action.payload} to favourites`;
        state.alertSeverity = "success";
        state.alertVisible = true;
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
    // Find the index of payload and remove it from the state.
    removeFavourite(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((element) => element === action.payload), 1);
      state.favourites = [...newArray];
      state.alertMessage = `Removed ${action.payload} from favourites`;
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

export const { getFavourites, addFavourite, clearFavourites, removeFavourite, turnInvisible, updateAlertProps } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;

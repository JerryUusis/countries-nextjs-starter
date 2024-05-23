import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    isVisible: false,
    message: "",
    severity: "success",
  },
  reducers: {
    setAlert: (state, action) => {
      const { isVisible, message, severity } = action.payload;
      state.isVisible = isVisible;
      state.message = message;
      state.severity = severity;
    },
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setAlert, setIsVisible } = alertSlice.actions;
export default alertSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    visibility: false,
    message: "",
    severity: "",
  },
  reducers: {
    setAlert: (state, action) => {
      const { visibility, message, severity } = action.payload;
      state.visibility = visibility;
      state.message = message;
      state.severity = severity;
    },
    setIsVisible: (state, action) => {
      state.visibility = action.payload;
    },
  },
});

export const { setAlert, setIsVisible } = alertSlice.actions;
export default alertSlice.reducer;

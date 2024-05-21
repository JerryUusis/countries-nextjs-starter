import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { clearVisitedCountries } from "../store/visitedCountriesSlice";
import {
  getVisitedCountriesFromSource,
  auth,
  clearVisitedCountriesFromFirebase,
} from "../auth/firebase";
import CountryCard from "../components/CountryCard";
import AlertHandler from "../components/AlertHandler";
import {
  CountriesStateType,
  VisitedCountriesStateType,
} from "../types/reduxStateTypes";
import { AppDispatch } from "../store/store";
import { handleAlert } from "../utils/helperFunctions";
import { AlertSeverity } from "../types/muiComponents";

const VisitedCountries = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = auth.currentUser;
  const visitedCountries = useSelector(
    (state: VisitedCountriesStateType) =>
      state.visitedCountries.visitedCountries
  );
  let countriesList = useSelector(
    (state: CountriesStateType) => state.countries.countries
  );

  if (visitedCountries.length > 0) {
    countriesList = countriesList.filter((country) =>
      visitedCountries.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getVisitedCountriesFromSource());
  }, [dispatch]);

  const showAlert = (message: string, severity: AlertSeverity) => {
    handleAlert(dispatch, message, severity);
  };

  // Clear countries from Redux and database and show alert
  const clearCountries = async () => {
    try {
      if (currentUser) {
        dispatch(clearVisitedCountries(currentUser));
        await clearVisitedCountriesFromFirebase(currentUser.uid);
        showAlert("Visited countries cleared", "success");
      } else {
        return;
      }
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  // Clear visited countries from redux and database if there are any.
  // Show alert
  const handleClearVisitedCountries = () => {
    if (!currentUser) return;

    if (countriesList.length === 0) {
      showAlert("Visited countries already cleared", "info");
    } else {
      clearCountries();
    }
  };

  return (
    <Box my={"2rem"}>
      <AlertHandler />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClearVisitedCountries()}
        >
          Clear visited countries
        </Button>
        <Box
          sx={{
            display: "flex",
            flexFlow: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {countriesList.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default VisitedCountries;

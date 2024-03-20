import { useEffect, useState } from "react";
import { Box, TextField, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import CountryCard from "../components/CountryCard";
import { getFavouritesFromSource } from "../auth/firebase";
import AlertHandler from "../components/AlertHandler";

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (loading) {
    return (
      <Box>
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    );
  }

  const filterCountries = (countriesArray, searchValue) => {
    const filteredCountries = countriesArray.filter((country) =>
      country.name.common.toLowerCase()
        .includes(searchValue.toLowerCase()));
    return filteredCountries;
  }
  // Instance of filterCountries return value
  const filteredCountries = filterCountries(countriesList, search);

  return (
    <Box sx={{ my: "2rem" }}>
      <AlertHandler />
      <Box sx={{ my: "2rem", display: "flex", justifyContent: "center" }}>
        <TextField
          color="secondary"
          label="Countries"
          placeholder="Search countries"
          onChange={(e) => setSearch(e.target.value)} />
      </Box>
      <Box sx={{
        display: "flex",
        flexFlow: "wrap",
        gap: "1rem",
        justifyContent: "center"
      }}>
        {filteredCountries.length === 0 ? 
        <Typography>No countries found with &quot;{search}&quot;</Typography> : 
        filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </Box>
    </Box>
  );
};

export default Countries;
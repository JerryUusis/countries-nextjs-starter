import { useEffect, useState } from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import CountryCard from "../components/CountryCard";

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading) {
    return (
      <Box>
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ my: "2rem" }}>
      <Box sx={{ my: "2rem", display: "flex", justifyContent: "center" }}>
        <TextField label="Countries" placeholder="Search for countries" onChange={(e) => setSearch(e.target.value)}></TextField>
      </Box>
      <Box sx={{ display: "flex", flexFlow: "wrap", gap: "1rem", justifyContent: "center" }}>
        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Box>
    </Box>
  );
};

export default Countries;
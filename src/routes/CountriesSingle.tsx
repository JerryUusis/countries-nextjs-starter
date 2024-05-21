import { Box, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VITE_GOOGLE_API, VITE_GOOGLE_MAP_ID } from "../utils/config";
import { APIProvider, Map } from "@vis.gl/react-google-maps"; //https://visgl.github.io/react-google-maps/
import { initializeCountries } from "../store/countriesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { WeatherData } from "../types/weather";
import { getWeather } from "../services/weatherService";
import { Country } from "../types/country";
import WeatherTable from "../components/WeatherTable";
import CountryDataTable from "../components/CountryDataTable";

const CountriesSingle = () => {
  const [weather, setWeather] = useState<WeatherData>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const country: Country = location.state.country;
  const dispatch: AppDispatch = useDispatch();

  const position = { lat: weather?.coord.lat, lng: weather?.coord.lon };
  // Center Maps to capital
  const defaultCenter = { lat: position.lat, lng: position.lng };

  useEffect(() => {
    dispatch(initializeCountries());
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeather(country.capital);
        setWeather(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchWeather();
  }, [country.capital]);

  if (loading) {
    return (
      <Box className="text-center m-5">
        <span className="visually-hidden">Loading...</span>
        <CircularProgress color="secondary" size="3rem" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3rem",
        mb: "2rem",
      }}
    >
      {!error && weather && (
        <CountryDataTable country={country} weather={weather} />
      )}
      {weather ? <WeatherTable country={country} weather={weather} /> : null}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/countries")}
      >
        Back to countries
      </Button>
      <APIProvider apiKey={VITE_GOOGLE_API}>
        <Box
          sx={{
            height: {
              xs: "300px",
              sm: "500px",
            },
            width: {
              xs: "300px",
              sm: "500px",
            },
          }}
        >
          <Map
            defaultZoom={8}
            defaultCenter={defaultCenter}
            mapId={VITE_GOOGLE_MAP_ID}
          />
        </Box>
      </APIProvider>
    </Box>
  );
};

export default CountriesSingle;

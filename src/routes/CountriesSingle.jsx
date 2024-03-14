import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const { VITE_OPENWEATHER_API } = import.meta.env;

const CountriesSingle = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${VITE_OPENWEATHER_API}`)
      .catch((error) => {
        console.log(error)
        setError(true)
      })
      .then((response) => {
        setWeather(response.data)
        setLoading(false)
      })
  }, [country.capital])

  if (loading) {
    return (
      <Box className="text-center m-5">
        <span className="visually-hidden">Loading...</span>
        <CircularProgress color="secondary" size="3rem" />
      </Box>
    )
  }

  return (
    <Box>
      <Box >
        <Box>
          <Box sx={{
            backgroundImage: `url(https://source.unsplash.com/featured/1600x900?${country.name.common})`,
            height: "337.5px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            maxWidth: "600px"
          }}
            alt={`Picture from ${country.name.common}`}></Box >
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>{country.name.common}</Typography>
          <Typography>Capital: {country.capital}</Typography>
          {!error && weather && (
            <Box>
              <Typography>
                Right now it is <strong>{weather.main.temp}</strong>{" "}
                degrees in {country.capital} and {" "} {weather.weather[0].description}
              </Typography>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={() => navigate("/countries")}>
            Back to countries
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CountriesSingle;

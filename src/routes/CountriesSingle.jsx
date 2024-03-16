import { Box, Button, Typography, CircularProgress, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const { VITE_OPENWEATHER_API, VITE_GOOGLE_API, VITE_GOOGLE_MAP_ID } = import.meta.env;
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, } from "@vis.gl/react-google-maps"; //https://visgl.github.io/react-google-maps/
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

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

  // const formatTime = (timeUnix) => {
  //   const dateObject = new Date(timeUnix * 1000);
  //   const hours = dateObject.getUTCHours();
  //   const minutes = dateObject.getUTCMinutes();
  //   return `${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}`;
  // };


  // const sunriseTimeUnix = weather.sys.sunrise;
  // const sunsetTimeUnix = weather.sys.sunset;
  const position = { lat: weather.coord.lat, lng: weather.coord.lon };
  console.log(country)

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
      my: "2rem"
    }}>
      {/* <Box sx={{
        backgroundImage: `url(https://source.unsplash.com/featured/1600x900?${country.name.common})`,
        height: "337.5px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        maxWidth: "600px"
      }}
        alt={`Picture from ${country.name.common}`}>
      </Box > */}
      {!error && weather && (
        <Box >
          <Box sx={{ display: "flex", gap: "2rem", alignItems: "flex-end" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>{country.name.common} {country.flag}</Typography>
              <Typography>Capital: {country.capital}</Typography>
            </Box>
            <Box>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <Typography >{weather.weather[0].description}</Typography>
              <Typography>Humidity {weather.main.humidity}%</Typography>
            </Box>

          </Box>
        </Box>
      )}
      <Box>
        <Typography>Current Weather</Typography>
        <TableContainer component={Paper} sx={{ maxWidth: "550px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><ThermostatIcon />Temperature</TableCell>
                <TableCell><AirIcon />Wind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Current {weather.main.temp}°C</TableCell>
                <TableCell>{weather.wind.speed} m/s</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Highest {weather.main.temp_max}°C</TableCell>
                <TableCell>Highest {weather.wind.gust} m/s</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lowest {weather.main.temp_min}°C</TableCell>
                <TableCell>Feels like {weather.main.feels_like}°C</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button variant="contained" color="secondary" onClick={() => navigate("/countries")}>
        Back to countries
      </Button>
      <APIProvider apiKey={VITE_GOOGLE_API} >
        <Box sx={{
          height: {
            xs: "300px",
            sm: "500px"
          },
          width: {
            xs:"300px",
            sm: "500px"
          }
        }} >
          <Map defaultZoom={8} defaultCenter={position} mapId={VITE_GOOGLE_MAP_ID} />
        </Box>
      </APIProvider >
    </Box >
  );
};

export default CountriesSingle;

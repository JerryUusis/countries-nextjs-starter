import { Box, Button, Typography, CircularProgress, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const { VITE_OPENWEATHER_API, VITE_GOOGLE_API, VITE_GOOGLE_MAP_ID } = import.meta.env;
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, } from "@vis.gl/react-google-maps"; //https://visgl.github.io/react-google-maps/
import { formatLanguages, formatCurrencies } from "../components/CountryCard";
import { initializeCountries } from "../store/countriesSlice";
import { useSelector, useDispatch } from "react-redux";

const CountriesSingle = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);

  const screenSizeSm = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    dispatch(initializeCountries())
  }, [])

  const getNeighbouringCountries = () => {
    const neighbouringCountries = [];

    if (country.borders.length === 0) {
      return []
    }

    for (const countryCioc of country.borders) {
      countriesList.forEach((country) => {
        if (countryCioc === country.cioc) {
          neighbouringCountries.push(`${country.name.common} ${country.flag}`)
        }
      })
    }
    return neighbouringCountries
  }

  const neighbouringCountries = formatLanguages(getNeighbouringCountries())

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
  const position = { lat: weather.coord.lat, lng: weather.coord.lon };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
      my: "2rem"
    }}>
      {!error && weather && (
        <Box >
          <Box sx={{}}>
            <Box sx={{
              display: "flex", flexDirection: {
                xs: "column",
                sm: "row"
              }, gap: "2rem",
            }}>
            </Box>
            <Box my={"2rem"}>
              <TableContainer component={Paper} sx={{ maxWidth: "550px" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "lightGrey" }}>
                      {screenSizeSm ?
                        (<>
                          <TableCell><img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} style={{ height: "200px", padding: "0.25rem" }} /></TableCell>
                          <TableCell><img src={country.flags.svg} alt={`${country.name.common} coat of arms`} style={{ height: "200px", padding: "0.25rem" }} /></TableCell>
                        </>)
                        :
                        (<TableCell colSpan={2} align="center" >
                          <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} style={{ height: "200px", marginBottom: "1rem" }} />
                          <img src={country.flags.svg} alt={`${country.name.common} coat of arms`} style={{ height: "200px" }} />
                        </TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell>Official name</TableCell>
                      <TableCell >{country.name.official}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Common name</TableCell>
                      <TableCell >{country.name.common}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Capital</TableCell>
                      <TableCell>{country.capital} {position.lat.toFixed(2)}°N {position.lng.toFixed(2)}°E</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Official languages</TableCell>
                      <TableCell>{formatLanguages(country.languages)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Official currency</TableCell>
                      <TableCell>{formatCurrencies(country.currencies)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Population</TableCell>
                      <TableCell>{country.population.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bordering countries</TableCell>
                      <TableCell>{neighbouringCountries}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box>
            </Box>
          </Box>
        </Box>
      )}
      <Box>
        <TableContainer component={Paper} sx={{ maxWidth: "550px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{country.capital} current weather</TableCell>
                <TableCell><ThermostatIcon />Temperature</TableCell>
                <TableCell><AirIcon />Wind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={2} align="center"><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} /></TableCell>
                <TableCell>Current {weather.main.temp}°C</TableCell>
                <TableCell>{weather.wind.speed} m/s</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Highest {weather.main.temp_max}°C</TableCell>
                <TableCell>Highest {weather.wind.gust} m/s</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{weather.weather[0].main}</TableCell>
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
            xs: "300px",
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

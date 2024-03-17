import { Box, Button, CircularProgress, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, useMediaQuery, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const { VITE_OPENWEATHER_API, VITE_GOOGLE_API, VITE_GOOGLE_MAP_ID } = import.meta.env;
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { APIProvider, Map } from "@vis.gl/react-google-maps"; //https://visgl.github.io/react-google-maps/
import { formatLanguages, formatCurrencies } from "../components/CountryCard";
import { initializeCountries } from "../store/countriesSlice";
import { useSelector, useDispatch } from "react-redux";
import NavigationIcon from '@mui/icons-material/Navigation';

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
    if (!country.borders || country.borders.length === 0) {
      return neighbouringCountries
    }

    for (const countryCioc of country.borders) {
      countriesList.forEach((neighbour) => {
        if (countryCioc === neighbour.cioc) {
          neighbouringCountries.push(<Link to={`/countries/${neighbour.name.common}`} state={{ country: neighbour }} key={neighbour.name.common}>{neighbour.name.common} {neighbour.flag}</Link>)
        }
      })
    }
    return neighbouringCountries
  }

  const neighbouringCountries = getNeighbouringCountries()

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
  const windAngle = weather.wind.deg;

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
      mb: "2rem"
    }}>
      {!error && weather && (
        <Box >
          <TableContainer component={Paper} sx={{ my: { xs: "0", sm: "2rem" } }}>
            <Table >
              <TableHead >
                <TableRow sx={{ backgroundColor: "lightGrey" }}>
                  <TableCell colSpan={2} align="center">
                    <Typography component={"h1"} sx={{ fontSize: "2rem" }}>{country.name.common}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "lightGrey" }}>
                  {screenSizeSm ?
                    (<>
                      <TableCell>
                        <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} style={{ height: "200px" }} />
                      </TableCell>
                      <TableCell>
                        <img src={country.flags.svg} alt={`${country.name.common} coat of arms`} style={{ height: "200px" }} />
                      </TableCell>
                    </>)
                    :
                    (<TableCell colSpan={2} align="center" >
                      <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} style={{ width: "325px", marginBottom: "1rem" }} />
                      <img src={country.flags.svg} alt={`${country.name.common} coat of arms`} style={{ width: "325px" }} />
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
                  <TableCell>{country.capital} {position.lat.toFixed(2)}°N, {position.lng.toFixed(2)}°E</TableCell>
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
                {neighbouringCountries.length > 0 ?
                  <TableRow>
                    <TableCell>Bordering countries</TableCell>
                    <TableCell>{getNeighbouringCountries()}</TableCell>
                  </TableRow> : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box >
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{country.capital} current weather</TableCell>
                <TableCell><ThermostatIcon />Temperature</TableCell>
                <TableCell><AirIcon />Wind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell rowSpan={2} align="center">
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
                </TableCell>
                <TableCell>Current {weather.main.temp.toFixed(0)}°C</TableCell>
                <TableCell>
                  {weather.wind.speed.toFixed(0)} m/s <NavigationIcon sx={{ ml: "0.125rem", transform: `rotate(${windAngle}deg)`, fontSize: "1rem", opacity: "0.75" }} />
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Max {weather.main.temp_max.toFixed(0)}°C</TableCell>
                <TableCell>Feels like {weather.main.feels_like.toFixed(0)}°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{weather.weather[0].main}</TableCell>
                <TableCell>Min {weather.main.temp_min.toFixed(0)}°C</TableCell>
                <TableCell>Humidity {weather.main.humidity} %</TableCell>
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

import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Country } from "../types/country";
import { WeatherData } from "../types/weather";

interface WeatherTableProps {
  country: Country;
  weather: WeatherData;
}

const WeatherTable = ({ country, weather }: WeatherTableProps) => {
  const windAngle = weather?.wind.deg;
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{country.capital} current weather</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <ThermostatIcon />
                  Temperature
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <AirIcon />
                  Wind
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={2} align="center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                  alt={weather?.weather[0].main}
                />
              </TableCell>
              <TableCell>Current {weather?.main.temp.toFixed(0)}°C</TableCell>
              <TableCell>
                {weather?.wind.speed.toFixed(0)} m/s{" "}
                <NavigationIcon
                  sx={{
                    ml: "0.125rem",
                    transform: `rotate(${windAngle}deg)`,
                    fontSize: "1rem",
                    opacity: "0.75",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Max {weather?.main.temp_max.toFixed(0)}°C</TableCell>
              <TableCell>
                Feels like {weather?.main.feels_like.toFixed(0)}°C
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{weather?.weather[0].main}</TableCell>
              <TableCell>Min {weather?.main.temp_min.toFixed(0)}°C</TableCell>
              <TableCell>Humidity {weather?.main.humidity} %</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeatherTable;

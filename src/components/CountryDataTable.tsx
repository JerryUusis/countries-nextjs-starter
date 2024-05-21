import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { useMediaQuery } from "@mui/material";
import { Country } from "../types/country";
import { WeatherData } from "../types/weather";
import { formatLanguages, formatCurrencies } from "../utils/helperFunctions";
import { useSelector } from "react-redux";
import { CountriesStateType } from "../types/reduxStateTypes";
import { Link } from "react-router-dom";

interface CountryDataTableProps {
  country: Country;
  weather: WeatherData;
}

const CountryDataTable = ({ country, weather }: CountryDataTableProps) => {
  const position = { lat: weather?.coord.lat, lng: weather?.coord.lon };
  const screenSizeSm = useMediaQuery("(min-width:600px)");
  const countriesList = useSelector(
    (state: CountriesStateType) => state.countries.countries
  );

  const getNeighbouringCountries = (): React.ReactNode[] => {
    const neighbouringCountries: React.ReactNode[] = [];
    if (!country.borders || country.borders.length === 0) {
      return neighbouringCountries;
    }

    for (const countryCioc of country.borders) {
      countriesList.forEach((neighbour) => {
        if (countryCioc === neighbour.cioc) {
          neighbouringCountries.push(
            <Link
              to={`/countries/${neighbour.name.common}`}
              state={{ country: neighbour }}
              key={neighbour.name.common}
            >
              {neighbour.name.common} {neighbour.flag}
            </Link>
          );
        }
      });
    }
    return neighbouringCountries;
  };

  const neighbouringCountries = getNeighbouringCountries();

  return (
    <Box>
      <TableContainer component={Paper} sx={{ my: { xs: "0", sm: "2rem" } }}>
        <Table>
          <TableBody>
            <TableRow sx={{ backgroundColor: "lightGrey" }}>
              <TableCell colSpan={2} align="center">
                <Typography component={"h1"} sx={{ fontSize: "2rem" }}>
                  {country.name.common}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "lightGrey" }}>
              {screenSizeSm ? (
                <>
                  <TableCell>
                    <img
                      src={country.coatOfArms.svg}
                      alt={`${country.name.common} coat of arms`}
                      style={{ height: "200px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={country.flags.svg}
                      alt={`${country.name.common} coat of arms`}
                      style={{ height: "200px" }}
                    />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={2} align="center">
                  <img
                    src={country.coatOfArms.svg}
                    alt={`${country.name.common} coat of arms`}
                    style={{ width: "325px", marginBottom: "1rem" }}
                  />
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} coat of arms`}
                    style={{ width: "325px" }}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Official name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {country.name.official}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Common name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {country.name.common}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Capital</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {country.capital} ({position.lat?.toFixed(2)}°N,{" "}
                {position.lng?.toFixed(2)}°E)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Official languages</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {formatLanguages(country.languages)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Official currency</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {formatCurrencies(country.currencies)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Population</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {country.population.toLocaleString()}
              </TableCell>
            </TableRow>
            {neighbouringCountries.length > 0 ? (
              <TableRow>
                <TableCell>Bordering countries</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {getNeighbouringCountries()}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CountryDataTable;

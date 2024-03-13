import { Box, Card, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { addFavourite } from "../store/favouritesSlice";
import { useDispatch } from "react-redux";

const CountryCard = ({ country }) => {
  // Flag is in 2∶1 in aspect ratio. Use this value to adjust the scale the flag size correctly.
  const FLAG_HEIGHT = 130;
  const dispatch = useDispatch();

  const formatLanguages = (languagesObject) => {
    if (!languagesObject) {
      return []
    }

    const languages = Object.values(languagesObject);
    if (languages.length === 0) {
      return [];
    }

    const formattedLanguages = [];
    if (languages.length === 1) {
      return languages;
    }
    for (let i = 0; i < languages.length; i++) {
      if (languages.length - 1 === i) {
        formattedLanguages.push(languages[i]);
      }
      else if (languages.length - 2 === i) {
        formattedLanguages.push(languages[i] + " & ")
      }
      else {
        formattedLanguages.push(languages[i] + ", ")
      }
    }
    return formattedLanguages
  }

  const formatCurrencies = (currencyObject) => {
    if (!currencyObject) {
      return [];
    }

    const currencies = Object.values(currencyObject);

    if (currencies.length === 0) {
      return [];
    }

    if (currencies.length === 1) {
      return currencies[0].name;
    }
    else {
      const formattedCurrencies = [];
      for (let i = 0; i < currencies.length; i++) {
        if (i === currencies.length - 1) {
          formattedCurrencies.push(currencies[i].name);
        }
        else if (i === currencies.length - 2) {
          formattedCurrencies.push(currencies[i].name + " & ")
        }
        else {
          formattedCurrencies.push(currencies[i].name + ", ")
        }
      }
      return formattedCurrencies;
    }
  }

  return (
    <Box key={country.name.common}>
      <Card sx={{ height: "350px", width: `${FLAG_HEIGHT * 2}px`, display: "flex", flexDirection: "column" }}>
        <Box position={"relative"}>
          <FavoriteIcon
            onClick={() => dispatch(addFavourite(country))}
            sx={{ position: "absolute", top: 0, right: 0, m: "0.125rem", cursor: "pointer" }}
          />
          <Link
            to={`/countries/${country.name.common}`}
            state={{ country: country }}
          >
            <CardMedia
              image={country.flags.svg}
              sx={{ height: `${FLAG_HEIGHT}px` }}
            />
          </Link>
        </Box>
        <Box sx={{ p: "1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <Typography sx={{ fontWeight: "bold", lineHeight: "1" }}>{country.name.common}</Typography>
            <Typography sx={{ lineHeight: "1" }}>
              {country.name.official}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-evenly" }}>
            <Typography sx={{ fontSize: "0.9rem", lineHeight: "1", fontStyle: "italic" }}>
              {formatLanguages(country.languages)}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem" }} >
              {formatCurrencies(country.currencies)}
            </Typography>
          </Box>
          <Typography >
            {country.population.toLocaleString()}
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}

export default CountryCard
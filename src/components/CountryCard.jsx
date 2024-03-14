import { useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TranslateIcon from '@mui/icons-material/Translate';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import { addFavourite } from "../store/favouritesSlice";
import { useDispatch } from "react-redux";

const CountryCard = ({ country }) => {
  const [favourite, setFavourite] = useState(false)
  // Flag is in 2∶1 in aspect ratio. Use this value to adjust the scale the flag size correctly.
  const FLAG_HEIGHT = 130;
  const dispatch = useDispatch();

  const handleFavouriteClick = () => {
    setFavourite(!favourite)
    dispatch(addFavourite(country.name.common))
  }

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

  const iconContainerProps = { display: "flex", alignItems: "flex-start", gap: "0.25rem" }
  const smallIconProps = { fontSize: "0.9rem", opacity: "0.5" }
  const favouriteIconProps = { position: "absolute", top: 0, right: 0, m: "0.125rem", cursor: "pointer", color: "#FF69B4" }

  return (
    <Box key={country.name.common}>
      <Card sx={{ height: "350px", width: `${FLAG_HEIGHT * 2}px`, display: "flex", flexDirection: "column" }}>
        <Box position={"relative"}>
          {favourite ?
            <FavoriteIcon
              onClick={handleFavouriteClick}
              sx={favouriteIconProps} /> :
            <FavoriteBorderIcon
              onClick={handleFavouriteClick}
              sx={favouriteIconProps}
            />}
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
            <Box sx={iconContainerProps}>
              <TranslateIcon sx={smallIconProps} />
              <Typography sx={{ fontSize: "0.9rem", lineHeight: "1", fontStyle: "italic" }}>
                {formatLanguages(country.languages)}
              </Typography>
            </Box>
            <Box sx={iconContainerProps}>
              <AttachMoneyIcon sx={smallIconProps} />
              <Typography sx={{ fontSize: "0.9rem", lineHeight: "1" }} >
                {formatCurrencies(country.currencies)}
              </Typography>
            </Box>
          </Box>
          <Box sx={iconContainerProps}>
            <PeopleIcon sx={{ opacity: "0.5" }} />
            <Typography >
              {country.population.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default CountryCard
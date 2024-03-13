import { useEffect, useState } from "react";
import { Box, TextField, Card, CardMedia, Typography, List, ListItem, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite } from "../store/favouritesSlice";

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
      <Box
      >
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    );
  }

  // Flag is in 2∶1 in aspect ratio. Use this value to adjust the scale the flag size correctly.
  const flagHeight = 130;

  const formatLanguages = (languagesObject) => {
    if (!languagesObject) {
      return []
    }
    
    const formattedLanguages = [];

    if (formatLanguages.length === 0) {
      return [];
    }
    const languages = Object.values(languagesObject)

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

  return (
    <Box>
      <Box m={2}>
        <TextField label="Countries" placeholder="Search for countries" onChange={(e) => setSearch(e.target.value)}></TextField>
      </Box>
      <Box sx={{ display: "flex", flexFlow: "wrap", gap: "1rem", justifyContent: "center" }}>
        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <Box key={country.name.common}>
              <Card sx={{ height: "350px", width: `${flagHeight * 2}px` }}>
                <FavoriteIcon
                  onClick={() => dispatch(addFavourite(country))}
                ></FavoriteIcon>
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <CardMedia
                    image={country.flags.svg}
                    sx={{ height: `${flagHeight}px` }}
                  />
                </Link>
                <Box sx={{ p: "1rem" }}>
                  <Typography sx={{ fontWeight: "bold" }}>{country.name.common}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {country.name.official}
                  </Typography>
                  <List>
                    <ListItem>
                      {formatLanguages(country.languages)}
                    </ListItem>
                    <ListItem>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListItem>
                    <ListItem>
                      {country.population.toLocaleString()}
                    </ListItem>
                  </List>
                </Box>
              </Card>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Countries;
import { Box, Card, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TranslateIcon from '@mui/icons-material/Translate';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite, updateAlertProps } from "../store/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { addFavouriteToFirebase, removeFavouriteFromFirebase, auth } from "../auth/firebase";
import { formatCurrencies, formatLanguages } from "../utils/helperFunctions";
import { useAuthState } from "react-firebase-hooks/auth";

const CountryCard = ({ country }) => {
  // Flag is in 2∶1 in aspect ratio. Use this value to adjust the scale the flag size correctly.
  const FLAG_HEIGHT = 130;
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const favourites = useSelector((state) => state.favourites.favourites);

  const handleAddFavouriteClick =  () => {
    try {
      dispatch(addFavourite(country.name.common));
       addFavouriteToFirebase(user.uid, country.name.common);
    }
    catch (error) {
      dispatch(updateAlertProps({
        message: `Error while adding ${country.name.common} to favourites: ${error.message}`,
        severity: "error",
        visible: true
      }))
    }
  }

  const handleRemoveFavouriteClick = async () => {
    try {
      dispatch(removeFavourite(country.name.common));
      await removeFavouriteFromFirebase(user.uid, country.name.common);
    }
    catch (error) {
      dispatch(updateAlertProps({
        message: `Error while removing ${country.name.common} from favourites: ${error.message}`,
        severity: "error",
        visible: true
      }))
    }
  }

  const iconContainerProps = { display: "flex", alignItems: "flex-start", gap: "0.25rem" }
  const smallIconProps = { fontSize: "0.9rem", opacity: "0.5" }
  const favouriteIconProps = { position: "absolute", top: 0, right: 0, m: "0.125rem", cursor: "pointer", color: "#FF69B4" }

  return (
    <Box key={country.name.common}>
      <Card sx={{ height: "350px", width: `${FLAG_HEIGHT * 2}px`, display: "flex", flexDirection: "column" }}>
        <Box position={"relative"}>
          {favourites.includes(country.name.common) ?
            <FavoriteIcon
              onClick={handleRemoveFavouriteClick}
              sx={favouriteIconProps} /> :
            <FavoriteBorderIcon
              onClick={handleAddFavouriteClick}
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
            <PeopleIcon sx={smallIconProps} />
            <Typography sx={{ fontSize: "0.9rem", lineHeight: "1" }}>
              {country.population.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default CountryCard
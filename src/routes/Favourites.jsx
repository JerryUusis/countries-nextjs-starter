import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { removeFavourite, clearFavourites } from "../store/favouritesSlice";
import { getFavouritesFromSource } from "../auth/firebase";
import CountryCard from "../components/CountryCard"

const Favourites = () => {
    const dispatch = useDispatch();

    const favourites = useSelector((state) => state.favourites.favourites);
    let countriesList = useSelector((state) => state.countries.countries);

    if (favourites.length > 0) {
        countriesList = countriesList.filter((country) =>
            favourites.includes(country.name.common)
        );
    } else {
        countriesList = [];
    }

    useEffect(() => {
        dispatch(initializeCountries());
        dispatch(getFavouritesFromSource());
    }, [dispatch]);

    const handleRemoveFavourite = (countryName) => {
        dispatch(removeFavourite(countryName))
    }

    const handleClearFavourites = () => {
        dispatch(clearFavourites())
    }

    useEffect(() => {
        dispatch(initializeCountries());
        dispatch(getFavouritesFromSource());
    }, [dispatch]);

    return (
        <Box >
            <Button variant="contained" color="secondary" onClick={() => handleClearFavourites()}>Clear favourites</Button>
            <Box>
                {countriesList.map((country) => (
                    <CountryCard country={country}/>
                ))}
            </Box>
        </Box>
    );
};

export default Favourites;
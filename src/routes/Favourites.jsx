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
        <Box my={"2rem"}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: "2rem" }}>
                <Button variant="contained" color="secondary" onClick={() => handleClearFavourites()}>Clear favourites</Button>
                <Box sx={{
                    display: "flex",
                    flexFlow: "wrap",
                    gap: "1rem",
                    justifyContent: "center"
                }}>
                    {countriesList.map((country) => (
                        <CountryCard country={country} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Favourites;
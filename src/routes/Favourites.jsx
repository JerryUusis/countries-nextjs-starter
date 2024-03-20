import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { clearFavourites } from "../store/favouritesSlice";
import { getFavouritesFromSource, auth } from "../auth/firebase";
import CountryCard from "../components/CountryCard";
import AlertHandler from "../components/AlertHandler";

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
        dispatch(initializeCountries(auth.currentUser.uid));
    }, [dispatch]);

    const handleClearFavourites = () => {
        dispatch(clearFavourites(auth.currentUser.uid))
    }

    return (
        <Box my={"2rem"}>
            <AlertHandler />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem"
            }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClearFavourites()}>
                    Clear favourites</Button>
                <Box sx={{
                    display: "flex",
                    flexFlow: "wrap",
                    gap: "1rem",
                    justifyContent: "center"
                }}>
                    {countriesList.map((country) => (
                        <CountryCard key={country.name.common} country={country} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Favourites;
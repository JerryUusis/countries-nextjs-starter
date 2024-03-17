import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {

  // Create a fancy landing page that has routes to login an register and maybe some animation or carousels etc.
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100vw", height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" } }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center", height: "100%", mx: "3rem", maxWidth: { xs: "280px", sm: "460px" } }}>
        <Typography component={"h1"} fontSize={"2rem"} >Welcome to countries app!</Typography>
        <Typography variant="h6">Explore countries around the world with ease</Typography>
        <Typography >Search for your favorite destinations, discover their languages, currencies, and more. Save your favorite countries for quick access. Start exploring now!</Typography>
        <Typography variant="body1" >You need to <Link to={"/register"}>register</Link> first to view the countries.</Typography>
        <Typography variant="body1" >If you already have an account then <Link to={"/login"}>log in</Link>.</Typography>
      </Box>
    </Box>
  );
};

export default Home;

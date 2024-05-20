import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../auth/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Header = () => {
  const [user] = useAuthState(auth);
  const [loggedUsername, setLoggedUsername] = useState("");
  const [anchorOpen, setAnchorOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", user?.uid));

        const getUserData = async () => {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setLoggedUsername(doc.data().name);
          });
        };
        getUserData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoggedUsername("");
    }
  }, [user]);

  const toggleDrawer = () => {
    setAnchorOpen(!anchorOpen);
  };

  // Used with drawer when logging out
  const handleLogout = () => {
    logout();
    toggleDrawer();
  };

  const setNavBarDisplay = () => {
    if (user) {
      return "space-between";
    } else {
      return "flex-end";
    }
  };

  const navBarItems = (
    <Toolbar sx={{ display: "flex", justifyContent: setNavBarDisplay() }}>
      {user ? (
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <AccountCircleOutlinedIcon color="darkest" />
          <Typography fontWeight={"bold"}>{loggedUsername}</Typography>
        </Box>
      ) : null}
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        {user ? (
          <>
            <Link to="/countries">
              <Button variant="text" color="darkest">
                Countries
              </Button>
            </Link>
            <Link to="/visitedcountries">
              <Button variant="text" color="darkest">
                Visited countries
              </Button>
            </Link>
            <Button onClick={logout} variant="outlined" color="darkest">
              Sign out
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/">
              <Button variant="text" color="darkest">
                Home
              </Button>
            </NavLink>
            <Link to="/login">
              <Button variant="text" color="darkest">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="text" color="darkest">
                Register
              </Button>
            </Link>
          </>
        )}
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <IconButton
          size="large"
          edge="end"
          onClick={toggleDrawer}
          color="darkest"
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );

  const hamburgerItems = (
    <Box width={200}>
      {user ? (
        <>
          <ListItem
            component={Link}
            to="/countries"
            onClick={toggleDrawer}
            sx={{ color: "darkest.main" }}
          >
            <ListItemText primary="Countries" />
          </ListItem>
          <ListItem
            component={Link}
            to="/visitedcountries"
            onClick={toggleDrawer}
            sx={{ color: "darkest.main" }}
          >
            <ListItemText primary="Visited countries" />
          </ListItem>
          <ListItem
            component={Link}
            onClick={handleLogout}
            sx={{ color: "darkest.main" }}
          >
            <ListItemText primary="Sign out" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem
            component={Link}
            to="/"
            color="primary"
            onClick={toggleDrawer}
            sx={{ color: "darkest.main" }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component={Link}
            to="/login"
            onClick={toggleDrawer}
            sx={{ color: "darkest.main" }}
          >
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            component={Link}
            to="/register"
            onClick={toggleDrawer}
            sx={{ color: "darkest.main" }}
          >
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, top: 0, zIndex: "100" }} position="sticky">
      <AppBar position="static">{navBarItems}</AppBar>
      <Drawer
        anchor="right"
        open={anchorOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
          },
        }}
      >
        <List>{hamburgerItems}</List>
      </Drawer>
    </Box>
  );
};

export default Header;

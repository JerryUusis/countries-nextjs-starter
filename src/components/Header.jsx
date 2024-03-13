import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, colors } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from "react-router-dom";
import { logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../auth/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Header = () => {
  const [user] = useAuthState(auth);
  const [loggedUsername, setLoggedUsername] = useState("");
  const [anchorOpen, setAnchorOpen] = useState(false);

  useEffect(() => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", user?.uid));

      const getUserData = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setLoggedUsername(doc.data().name);
        });
      };
      if (user) {
        getUserData()
      }
    }
    catch (error) {
      console.log(error)
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoggedUsername("")
    }
  }, [user])

  const toggleDrawer = () => {
    setAnchorOpen(!anchorOpen)
  }

  const setNavBarDisplay = () => {
    if (user) {
      return "space-between"
    }
    else {
      return "flex-end"
    }
  }

  const navBarItems = (
    <Toolbar sx={{ display: "flex", justifyContent: setNavBarDisplay() }}>
      {user ? (
        <Typography >
          Logged in as <strong>{loggedUsername}</strong>
        </Typography>
      ) : null}
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <NavLink to="/">
          <Button variant="text" color="secondary">Home</Button>
        </NavLink>
        <Link to="/countries">
          <Button variant="text" color="secondary">Countries</Button>
        </Link>
        <Link to="/favourites">
          <Button variant="text" color="secondary">Favourites</Button>
        </Link>
        {!user ? (
          <>
            <Link to="/register">
              <Button variant="text" color="secondary">Register</Button>
            </Link>
            <Link to="/login">
              <Button variant="text" color="secondary">Login</Button>
            </Link>
          </>
        ) : (
          <Button onClick={logout} variant="outlined" color="secondary">Sign out</Button>
        )}
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <IconButton
          size="large"
          edge="end"
          onClick={toggleDrawer}
          color="secondary"
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Toolbar>
  )

  const hamburgerItems = (
    <Box width={200}>
      <ListItem component={Link} to="/" color="primary" onClick={toggleDrawer}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to="/countries" onClick={toggleDrawer}>
        <ListItemText primary="Countries" />
      </ListItem>
      <ListItem component={Link} to="/favourites" onClick={toggleDrawer}>
        <ListItemText primary="Favourites" />
      </ListItem>
      {!user ? (
        <>
          <ListItem component={Link} to="/register" onClick={toggleDrawer}>
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem component={Link} to="/login" onClick={toggleDrawer}>
            <ListItemText primary="Login" />
          </ListItem>
        </>
      ) : (
        <ListItem component={Link} onClick={logout} >
          <ListItemText primary="Sign out" />
        </ListItem>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, top: 0, zIndex: "100" }} position="sticky">
      <AppBar position="static">
        {navBarItems}
      </AppBar>
      <Drawer
        anchor="right"
        open={anchorOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor:"primary.main"
          }
        }}
      >
        <List >
          {hamburgerItems}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;

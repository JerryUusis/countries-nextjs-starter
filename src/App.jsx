import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { amber, grey, lightBlue } from "@mui/material/colors";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoutes";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import VisitedCountries from "./routes/VisitedCountries";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Root from "./routes/Root";
import store from "./store/store";

const theme = createTheme({
  palette: {
    primary: {
      main: amber[300],
    },
    secondary: {
      main: lightBlue[600],
    },
    darkest: {
      main: grey[900],
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="/countries"
                element={<ProtectedRoute component={Countries} />}
              />
              <Route
                path="/visitedcountries"
                element={<ProtectedRoute component={VisitedCountries} />}
              />
              <Route
                path="/countries/:single"
                element={<ProtectedRoute component={CountriesSingle} />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

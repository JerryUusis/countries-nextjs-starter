import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AlertHandler from "../components/AlertHandler";
import { handleAlert } from "../utils/helperFunctions";
import { useDispatch } from "react-redux";
import { AlertSeverity } from "../types/muiComponents";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showAlert = (message: string, severity: AlertSeverity) => {
    handleAlert(dispatch, message, severity);
  };

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
    } catch (error: any) {
      showAlert(error.message, "warning");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [loading, navigate, user]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
      }}
    >
      <AlertHandler />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        component={"form"}
        onSubmit={login}
      >
        <Typography variant="h1" sx={{ fontSize: "2rem" }} component={"h1"}>
          Login
        </Typography>
        <TextField
          type="text"
          value={email}
          placeholder="Email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          color="secondary"
        />
        <TextField
          type="password"
          value={password}
          placeholder="Password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          color="secondary"
        />
        <Button color="secondary" variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

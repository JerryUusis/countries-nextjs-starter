import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, loginWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        loginWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/countries")
    }, [loading, navigate, user])

    return (
        <Box sx={{ width: "100vw", height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Typography variant="h1" sx={{ fontSize: "2rem" }} component={"h1"}>Login</Typography >
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
                <Button onClick={login} color="secondary" variant="contained">Login</Button>
            </Box>
        </Box>
    )

}

export default Login
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = (event) => {
        event.preventDefault();
        if (!name) alert("Please enter your name");
        registerWithEmailAndPassword(name, email, password);
    }

    useEffect(() => {
        if (loading) return;
        if (user) console.log("User info:", user)
        if (user) navigate("/countries")
    }, [loading, user])

    return (
        <Box sx={{ width: "100vw", height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignItems: "center", height: "100%" }}
                component={"form"} onSubmit={register}>
                <Typography variant="h1" sx={{ fontSize: "2rem" }} component={"h1"}>Register</Typography>
                <TextField
                    label="Full name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    color="secondary"
                />
                <TextField
                    label="Email"
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    color="secondary"
                />
                <TextField
                    type="password"
                    value={password}
                    label="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    color="secondary"
                />
                <Button type="submit" color="secondary" variant="contained">Submit</Button>
                <Typography mx={"3rem"} sx={{textAlign:"center"}}>Your email is stored for authentication purposes only</Typography>
            </Box>
        </Box>
    )
}

export default Register
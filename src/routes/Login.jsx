import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, loginWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        loginWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        if (loading) return;
        if (user) console.log("User info:", user)
        if (user) navigate("/countries")
    }, [loading, user])

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={login} >Submit</Button>
        </div>
    )

}

export default Login
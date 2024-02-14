import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter your name");
        registerWithEmailAndPassword(name, email, password);
    }

    useEffect(() => {
        if (loading) return;
        if (user) console.log("User info:", user)
        if (user) navigate("/countries")
    }, [loading, user])

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                value={name}
                placeholder="Full name"
                onChange={(event) => setName(event.target.value)}
            />
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
            <Button onClick={register} >Submit</Button>
        </div>
    )

}

export default Register
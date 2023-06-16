import "./login.css"
import { Container, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { actionUserLogin, actionUserLoginWithGoogle } from "../../actions/UserAction";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import TextField from '@mui/material/TextField';
import LoadingSpinner from "../LoadingSpinner";

export default function LoginInput() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userLoginResult, userLoginError } = useSelector((state) => state.UserReducer)

    async function handleSubmit(e) {
        setAlert(true)
        setIsLoading(true)
        e.preventDefault()
        
        dispatch(actionUserLogin({ email, password }))
    }

    useEffect(() => {
        if (userLoginError) {
            setIsLoading(false)
            setEmail("")
            setPassword("")
            const timer = setTimeout(() => {
                setAlert(false)
            }, 2500)

            return () => clearTimeout(timer)
        }

        const isTokenExist = localStorage.getItem("token")

        if (isTokenExist) navigate("/")

    }, [userLoginResult, userLoginError, isLoading, navigate])

    const responseSuccessGoogle = (response) => {
        setIsLoading(true)
        
        if (response.credential) {
            dispatch(actionUserLoginWithGoogle({ token: response.credential }))
        }
    }

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h3>Login</h3>
            {userLoginError ? (
                <Alert show={alert} variant="danger" style={{ width: "70%", fontSize: "15px" }}>{userLoginError}</Alert>
            ) : ""}
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100 mb-4">
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    placeholder="masukan email"
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    style={{ width: "70%" }}
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    placeholder="masukan password"
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    style={{ width: "70%" }}
                />
                <Link to={"/forgot-password"}>Forgot Password</Link>
                <button type="submit" value={isLoading ? "Loading" : "Login"} className="btn btn--primary">{isLoading ? <LoadingSpinner /> : "Login"}</button>
            </form>
            <p>Another options for login</p>
            <GoogleOAuthProvider clientId="785137861913-jraaaegd6mhuunhiuntrpighacick6ea.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        responseSuccessGoogle(credentialResponse)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    shape="circle"
                    type="icon"
                />
            </GoogleOAuthProvider>
            <p className="mt-3">Dont have an account?<Link to={"/register"} className="ms-2">Register here</Link></p>
        </Container>
    );
}
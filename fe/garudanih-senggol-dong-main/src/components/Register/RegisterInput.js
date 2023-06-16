import TextField from '@mui/material/TextField';
import LoadingSpinner from "../LoadingSpinner";
import { Container, Alert } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionUserRegister } from "../../actions/UserAction";
import { Link } from "react-router-dom";

export default function RegisterInput() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(true);
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch()

    const { userRegisterResult, userRegisterError } = useSelector((state) => state.UserReducer)

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj[name] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    async function handleSubmit(e) {
        setAlert(true)
        setIsLoading(true)
        e.preventDefault()
        const password = input.confirmPassword

        if (input.password !== input.confirmPassword) {
            setError({ confirmPassword: "Password doesn't match" })
            setIsLoading(false)
            return
        }

        dispatch(actionUserRegister({ email, name, password }))
    }

    useEffect(() => {
        if (userRegisterError) {
            setIsLoading(false)
            setName("")
            setEmail("")
            setInput({
                password: '',
                confirmPassword: ''
            })
            const timer = setTimeout(() => {
                setAlert(false)
            }, 2500)

            return () => clearTimeout(timer)
        }

        if (userRegisterResult) {
            setIsLoading(false)
            setName("")
            setEmail("")
            setInput({
                password: '',
                confirmPassword: ''
            })
            const timer = setTimeout(() => {
                setAlert(false)
            }, 8000)

            return () => clearTimeout(timer)
        }
    }, [userRegisterResult, userRegisterError, isLoading])

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h3>Register</h3>
            {userRegisterError ? (
                <Alert show={alert} variant="danger" style={{ width: "70%", fontSize: "15px" }}>{userRegisterError}</Alert>
            ) : userRegisterResult ? (
                <Alert show={alert} variant="success" style={{ width: "70%", fontSize: "15px" }}>Register successfully, please check {userRegisterResult.data.email} to verify your account</Alert>
            ) : ""}
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100 mb-4">
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="name"
                    placeholder="masukan nama"
                    margin="normal"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    style={{ width: "70%" }}
                />
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
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}
                    style={{ width: "70%" }}
                />
                <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    placeholder="ketik ulang password"
                    margin="normal"
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={onInputChange}
                    onBlur={validateInput}
                    style={{ width: "70%" }}
                />
                {error.confirmPassword && <span style={{ color: "red", textAlign: "left !importan" }}>{error.confirmPassword}</span>}
                <button type="submit" value={isLoading ? "Loading" : "Register"} className="btn btn--primary">{isLoading ? <LoadingSpinner /> : "Register"}</button>
            </form>
            <p className="mt-3">Already have an account?<Link to={"/login"} className="ms-2">Login here</Link></p>
        </Container>
    )
}
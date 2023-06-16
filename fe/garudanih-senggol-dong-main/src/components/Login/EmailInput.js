import axios from "axios"
import TextField from '@mui/material/TextField';
import LoadingSpinner from "../LoadingSpinner";
import { Container, Alert } from "react-bootstrap"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function EmailInput() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(true);
    const [response, setResponse] = useState("")

    async function handleSubmit(e) {
        setAlert(true)
        setIsLoading(true)
        e.preventDefault()
        
        axios({
            method: 'POST',
            url: 'https://api-ticket.up.railway.app/v1/user/forgot-password',
            timeout: 120000,
            data: {
                email: email
            }
        }).then((res) => {
            setIsLoading(false)
            setResponse(res.data.message)

            const timer = setTimeout(() => {
                setAlert(false)
            }, 8000)

            return () => clearTimeout(timer)
        }).catch((err) => {
            setIsLoading(false)
            setResponse(err.message)

            const timer = setTimeout(() => {
                setAlert(false)
            }, 8000)

            return () => clearTimeout(timer)
        })
    }

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <h3>Forgot Password</h3>
            {response ? (
                <Alert show={alert} variant="success" style={{ width: "70%", fontSize: "15px" }}>{response}</Alert>
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
                <button type="submit" value={isLoading ? "Loading" : "Send Confirmation Email"} className="btn btn-primary">{isLoading ? <LoadingSpinner /> : "Send Confirmation Email"}</button>
            </form>
            <p className="mt-3">Already have an account?<Link to={"/login"} className="ms-2">Login here</Link></p>
        </Container>
    )
}
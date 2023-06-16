import bgLogin from "../assets/bg_login.png"
import LoginInput from "../components/Login/LoginInput"
import { Row, Col } from "react-bootstrap"

export default function Login() {
    return (
        <div className="login-page">
            <Row className="h-100">
                <Col md="7">
                    <div className="login-icon p-4">
                        <i className="bi bi-airplane-fill"></i>
                        <p className="d-flex my-auto">Garuda<span>Nih</span></p>
                    </div>
                    <LoginInput />
                </Col>
                <Col md="5" className="login--right">
                    <img src={bgLogin} alt="bg-login" className="w-50 m-5" />
                    <div className="login-title">
                        <h1 className="fw-bold px-5 text-white">Hi, Welcome to GarudaNih</h1>
                        <p className="px-5 py-4">Login to get interesting offers and create wonderful experiences</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
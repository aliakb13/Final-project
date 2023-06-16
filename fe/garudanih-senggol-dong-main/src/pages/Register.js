import "../components/Login/login.css";
import bgAirplane from "../assets/airplane.png";
import RegisterInput from "../components/Register/RegisterInput";
import { Row, Col } from "react-bootstrap";

export default function Register() {
    return (
        <div className="login-page">
            <Row className="h-100">
                <div className="register-icon p-4">
                    <i className="bi bi-airplane-fill"></i>
                    <p className="d-flex my-auto">Garuda<span>Nih</span></p>
                </div>
                <Col md="5" className="register--left">
                    <img src={bgAirplane} alt="bg-register" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                </Col>
                <Col md="7">
                    <RegisterInput />
                </Col>
            </Row>
        </div>
    )
}
import '../components/Home/User/user.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavUser from '../components/Nav/NavUser';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

export default function UserPage() {
    const location = useLocation().pathname

    return (
        <div>
            <div className={location === "/" ? "bg--home" : "bg--airplane"}>
                <NavUser />
                <Container className="intro--user">
                    <Row>
                        <Col>
                            <div className="title">Transaksi cepet, Gak pake ribet</div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Outlet />
            <div className="footer--user">
                <Container>
                    <Row>
                        <Col md="4">
                            <div className="d-flex flex-column">
                                <p>Menu</p>
                                <Link to={"/"} className="footer--nav">Home</Link>
                                <Link to={"ticket"} className="footer--nav">Ticket</Link>
                                <Link to={"transaction"} className="footer--nav">Transaction</Link>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="d-flex flex-column">
                                <p>Contact</p>
                                <p>+0822-1023-777</p>
                                <p>contoh@gmail.com</p>
                                <p>Sleman, Yogyakarta</p>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="d-flex flex-column">
                                <p>Social Media</p>
                                <div>
                                    <a href="https://instagram.com/yusr0nab" className="footer--social"><Instagram /></a>
                                    <a href="https://facebook.com/" className="footer--social"><Facebook /></a>
                                    <a href="https://twitter.com/" className="footer--social"><Twitter /></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <p className="text-center mt-5">Garudanih &copy; 2022</p>
                </Container>
            </div>
        </div>
    );
}
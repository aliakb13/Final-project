import axios from "axios";
import Carousel from "react-multi-carousel";
import moment from "moment";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFlightTicket } from '../../../actions/TicketAction';
import CardSkeleton from "../../Loader/CardSkeleton";
import { Link } from "react-router-dom";
import { AccountBalanceWallet, AdminPanelSettings, AirplaneTicket } from "@mui/icons-material";

export default function DashboardUser() {
    const [domesticTicket, setDomesticTicket] = useState([])
    const [internationalTicket, setInternationalTicket] = useState([])
    const [image, setImage] = useState([])
    const [imageDomestic, setImageDomestic] = useState([])

    const dispatch = useDispatch()

    const { flightTicketResult } = useSelector((state) => state.TicketReducer)

    useEffect(() => {

        dispatch(getFlightTicket())

    }, [dispatch])

    useEffect(() => {

        if (flightTicketResult) {
            setDomesticTicket(flightTicketResult.filter((ticket) => ticket.flight === "DOMESTIC"))
            setInternationalTicket(flightTicketResult.filter((ticket) => ticket.flight === "INTERNATIONAL"))
        }

    }, [flightTicketResult])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    useEffect(() => {
        const getImage = async (query) => await axios({ method: 'GET', url: `https://pixabay.com/api/?key=32369359-5b468d17bb149f9a77cb4200c&q=${query}&image_type=photo&pretty=true` })

        let arrImg = []

        if (domesticTicket.length !== 0) {
            domesticTicket.forEach(async (ticket) => {
                const image = ticket.destination.toLowerCase().split(", ")[1].replaceAll(" ", "+")

                await getImage(image).then((res) => {
                    arrImg.push(res.data.hits[0].webformatURL)
                })
                setImageDomestic(arrImg)
            })

        }

    }, [domesticTicket])

    useEffect(() => {
        const getImage = async (query) => await axios({ method: 'GET', url: `https://pixabay.com/api/?key=32369359-5b468d17bb149f9a77cb4200c&q=${query}&image_type=photo&pretty=true` })

        let arrImg = []

        if (internationalTicket.length !== 0) {
            internationalTicket.forEach(async (ticket) => {
                const image = ticket.destination.toLowerCase().split(", ")[1].replaceAll(" ", "+")

                await getImage(image).then((res) => {
                    arrImg.push(res.data.hits[0].webformatURL)
                })
                setImage(arrImg)
            })

        }

    }, [internationalTicket])

    return (
        <div>
            <Container>
                <h3 style={{ color: "#2F82FF", marginTop: "2em" }}>GarudaNih Destination</h3>
                <p className="my-3 fs-5 fw-bold">Domestic</p>
                <Row>
                    {domesticTicket.length !== 0 ? (
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            responsive={responsive}
                            ssr={true}
                            keyBoardControl={true}
                            customTransition="all 1.5s ease-in-out"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            showDots={true}
                        >
                            {domesticTicket.map((ticket, index) => {
                                return (
                                    <div key={index} className="d-flex align-items-stretch position-relative me-4">
                                        <Card className="dashboard--int" style={{ backgroundImage: `url(${imageDomestic[index]})` }}>
                                            <Card.Body className="w-100" style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>
                                                <p style={{ color: "#2F82FF" }}>{ticket.code}</p>
                                                <Row>
                                                    <Col md="5" className="text-white">
                                                        <p>From</p>
                                                        <p className="fs-5 m-0 text-truncate">{ticket.departure.split(",")[1] || ticket.departure}</p>
                                                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                                    </Col>
                                                    <Col md="2" className="text-center my-auto" style={{ rotate: "90deg", color: "#2F82FF" }}>
                                                        <i className="bi bi-airplane fs-5"></i>
                                                    </Col>
                                                    <Col md="5" className="text-white">
                                                        <p>To</p>
                                                        <p className="fs-5 m-0 text-truncate">{ticket.destination.split(",")[1] || ticket.destination}</p>
                                                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                                    </Col>
                                                </Row>
                                                <p className="text-white">{moment(ticket.takeOff).format('ll')}</p>
                                            </Card.Body>
                                            <Card.Footer className="dashboard--card--footer">
                                                <Link to={`ticket/${ticket.id}`}>Rp{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Link>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Carousel>
                    ) : <CardSkeleton md="4" />}
                </Row>
                <p className="my-3 fs-5 fw-bold">International</p>
                <Row>
                    {internationalTicket.length !== 0 ? (
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            responsive={responsive}
                            ssr={true}
                            keyBoardControl={true}
                            customTransition="all 1.5s ease-in-out"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            showDots={true}
                        >
                            {internationalTicket.map((ticket, index) => {
                                return (
                                    <div key={index} className="d-flex align-items-stretch position-relative me-4">
                                        <Card className="dashboard--int" style={{ backgroundImage: `url(${image[index]})` }}>
                                            <Card.Body className="w-100" style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}>
                                                <p style={{ color: "#2F82FF" }}>{ticket.code}</p>
                                                <Row>
                                                    <Col md="5" className="text-white">
                                                        <p>From</p>
                                                        <p className="fs-5 m-0 text-truncate">{ticket.departure.split(",")[1] || ticket.departure}</p>
                                                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                                    </Col>
                                                    <Col md="2" className="text-center my-auto" style={{ rotate: "90deg", color: "#2F82FF" }}>
                                                        <i className="bi bi-airplane fs-5"></i>
                                                    </Col>
                                                    <Col md="5" className="text-white">
                                                        <p>To</p>
                                                        <p className="fs-5 m-0 text-truncate">{ticket.destination.split(",")[1] || ticket.destination}</p>
                                                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                                    </Col>
                                                </Row>
                                                <p className="text-white">{moment(ticket.takeOff).format('ll')}</p>
                                            </Card.Body>
                                            <Card.Footer className="dashboard--card--footer">
                                                <Link to={`ticket/${ticket.id}`}>Rp{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Link>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                )
                            })}
                        </Carousel>
                    ) : <CardSkeleton md="4" />}
                </Row>
            </Container>

            <div className="bg--why">
                <h3>Safe Flight With <span style={{ color: "#2F82FF" }}>GarudaNih</span></h3>
                <h4>#GarudaNih with you</h4>
                <Link to={"ticket"}>More Info</Link>
            </div>

            <Container>
                <h3 style={{ color: "#2F82FF", margin: "1.4em 0" }}>Why GarudaNih</h3>
                <Row>
                    <Col md="4">
                        <div className="dashboard--card--why">
                            <div className="header">
                                <div className="img-box">
                                    <AccountBalanceWallet />
                                </div>
                                <h1 className="dashboard--card--why--title">Transaksi</h1>
                            </div>
                            <div className="dashboard--card--why--content">
                                <p>Proses order cepat dan gak pake ribet untuk semua jenis tiket</p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="dashboard--card--why">
                            <div className="header">
                                <div className="img-box">
                                    <AirplaneTicket />
                                </div>
                                <h1 className="dashboard--card--why--title">Ticket</h1>
                            </div>
                            <div className="dashboard--card--why--content">
                                <p>Berbagai macam pilihan penerbangan mulai domestik sampai international</p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="dashboard--card--why">
                            <div className="header">
                                <div className="img-box">
                                    <AdminPanelSettings />
                                </div>
                                <h1 className="dashboard--card--why--title">Security</h1>
                            </div>
                            <div className="dashboard--card--why--content">
                                <p>Kemudahan, keamanan, dan kenyamanan pengguna prioritas utama</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}
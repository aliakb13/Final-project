import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import CardSkeleton from "../../Loader/CardSkeleton";
import DetailTicket from "../../Modal/DetailTicket";

export default function FetchingDataTicket(props) {
    const [tickets, setTickets] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [dataTicket, setDataTicket] = useState(null);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/ticket-${props.type}`,
            timeout: 120000,
        }).then((res) => {
            setTickets(res.data.data.tickets)
        }).catch((err) => {
            console.log(err.message)
        })

    }, [tickets, props.type])

    const onHandleDetail = (id) => {
        setModalShow(true)
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/ticket/${id}`,
            timeout: 120000,
        }).then((res) => {
            setDataTicket(res.data.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }

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

    return (
        <Row>
            {tickets.length !== 0 ? (
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
                    deviceType={props.deviceType}
                    dotListClass="custom-dot-list-style"
                    showDots={true}
                >
                    {tickets.map((ticket, index) => {
                        return (
                            <div key={index} className="d-flex align-items-stretch position-relative me-4">
                                <Card className="w-100 mb-4 card-container">
                                    <Card.Body className="w-100 card-content">
                                        <p style={{ color: "#2F82FF" }}>{ticket.code}</p>
                                        <Row>
                                            <Col md="5">
                                                <p className="text-muted">From</p>
                                                <p className="fs-5 m-0 text-truncate">{ticket.departure.split(",")[1] || ticket.departure}</p>
                                                <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                            </Col>
                                            <Col md="2" className="text-center my-auto" style={{ rotate: "90deg", color: "#2F82FF" }}>
                                                <i className="bi bi-airplane fs-5"></i>
                                            </Col>
                                            <Col md="5">
                                                <p className="text-muted">To</p>
                                                <p className="fs-5 m-0 text-truncate">{ticket.destination.split(",")[1] || ticket.destination}</p>
                                                <p className="fw-bold" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                            </Col>
                                        </Row>
                                        <p>{moment(ticket.takeOff).format('ll')}</p>
                                    </Card.Body>
                                    <div className="flap" datacode={ticket.code} dataindex={index + 1}></div>
                                    <Card.Footer onClick={() => onHandleDetail(ticket.id)}>
                                        <p className="my-auto text-white">Rp{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )

                    })}
                </Carousel>
            ) : <CardSkeleton md="4" />}
            {dataTicket ? (
                <DetailTicket
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    detail={dataTicket}
                />
            ) : ""}
        </Row>
    );
}
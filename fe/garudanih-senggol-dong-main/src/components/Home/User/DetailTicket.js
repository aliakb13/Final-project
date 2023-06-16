import './user.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import moment from "moment";
import { Add, AirlineSeatReclineExtra, AssignmentInd, Pin } from "@mui/icons-material";
import { useEffect, useState, forwardRef, Fragment } from "react";
import { Card, Col, Container, Row, Form, OverlayTrigger, Tooltip, ToggleButton, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingSquare from '../../Loader/LoadingSquare';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import LoadingSpinner from '../../LoadingSpinner'

export default function DetailTicket() {
    const { id } = useParams()

    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [returnNumber, setReturnNumber] = useState([])
    const [radios, setRadios] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addWishlist, setAddWishlist] = useState(false);
    const [message, setMessage] = useState(null)
    const [requestBody, setRequestBody] = useState({
        ktp: "",
        orderBy: "",
        numChair: 0,
        returnTicketId: null,
        returnTicketChair: 0,
    })


    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/ticket/${id}`,
            timeout: 120000,
        }).then((res) => {
            setData(res.data.data)

        }).catch((err) => {
            console.log(err.message)
        })

        const token = localStorage.getItem("token")

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/user/wishlist`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            const found = res.data.data.wishlist.some(el => el.ticketId.toString() === id);

            if (found) setAddWishlist(true);

        }).catch((err) => {
            console.log(err.message)
        })

    }, [id])

    useEffect(() => {
        if (data) {
            let array = []

            for (let index = 0; index < data.ticket.totalChair; index++) {
                array.push({ name: `${index}`, value: `${index}` });
            }

            setRadios(array)
        }

    }, [data])

    useEffect(() => {
        if (data) {
            let arr = []

            data.returnTicket.forEach((ticket, i) => {
                if (ticket.id.toString() === requestBody.returnTicketId) {
                    for (let i = 0; i < ticket.totalChair; i++) {
                        const found = ticket.bookingBy.some(el => el.numChair === i);

                        if (!found) arr.push({ value: i, label: i });
                    }
                }
            })
            setReturnNumber(arr)
        }
    }, [data, requestBody])

    const onChangeHandler = (e) => {
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/trans/${id}`,
            timeout: 120000,
            data: requestBody,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            setOpen(true)

            setMessage({ info: res.data.data.desc, success: true })

        }).catch((err) => {
            setOpen(true)

            setMessage({ info: err.response.data.message, success: false })
        })
    };

    const onWishlistHandler = () => {
        setLoading(true)

        const token = localStorage.getItem("token")

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/wishlist/${id}`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {
            setLoading(false)
            setAddWishlist(true)

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        navigate("/transaction")
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Container>
            {open ? (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert onClose={handleClose} severity={message.success ? "success" : "error"} sx={{ width: '100%' }}>
                        {message.info}
                    </Alert>
                </Snackbar>
            ) : ""}
            {data ? (
                <Row>
                    <Col md="8" className="mb-4">
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold my-auto">{data.ticket.code}</p>
                                    <div className="d-flex">
                                        <p className="my-auto me-2">{moment(data.ticket.takeOff).format('LL')}</p>
                                        {addWishlist ? "" : <Button onClick={() => onWishlistHandler()} variant="outline-primary">{loading ? <LoadingSpinner /> : (
                                            <>
                                                <Add className="me-2" />Add Wishlist
                                            </>
                                        )}</Button>}
                                    </div>
                                </div>
                                <Row className="my-4">
                                    <Col md="1" className="text-end"><i className=" bi-geo-alt-fill fs-5"></i></Col>
                                    <Col md="10" className="d-flex">
                                        <div className="animate--line">
                                            <hr style={{ borderColor: "#2F82FF", borderWidth: "7px" }} />
                                        </div>
                                        <i className=" bi-airplane-fill fs-5" style={{ rotate: "90deg" }}></i>
                                    </Col>
                                    <Col md="1">
                                        <i className=" bi-geo-alt-fill fs-5"></i>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-column me-3">
                                        <p className="fs-5">{data.ticket.departure}</p>
                                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({data.ticket.departureCode})</p>
                                        <p>{moment(data.ticket.takeOff).format('LT')}</p>
                                    </div>
                                    <div className="d-flex flex-column text-end ms-3">
                                        <p className="fs-5">{data.ticket.destination}</p>
                                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({data.ticket.destinationCode})</p>
                                        <p>{moment(data.ticket.arrive).format('LT')}</p>
                                    </div>
                                </div>
                                <hr style={{ borderColor: "#2F82FF", borderWidth: "3px" }} />
                                <Row>
                                    <Col md="4" className="text-center">
                                        <p className="text-muted m-0">Price</p>
                                        <p className="fw-bold m-0">Rp{data.ticket.price}</p>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <p className="text-muted m-0">Class</p>
                                        <p className="fw-bold m-0">{data.ticket.class}</p>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <p className="text-muted m-0">Type</p>
                                        <p className="fw-bold m-0">{data.ticket.type}</p>
                                    </Col>
                                </Row>
                                <hr style={{ borderColor: "#2F82FF", borderWidth: "3px" }} />
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold my-auto">Description Available Seat</p>
                                    <p className="bg-primary py-1 px-3 rounded text-white">{data.ticket.bookingBy.length} / {data.ticket.totalChair}</p>
                                </div>
                                <div className="d-flex flex-wrap justify-content-between">
                                    {radios.map((radio, i) => {
                                        return (
                                            data.ticket.bookingBy.some(el => el.numChair === i) ? (
                                                <OverlayTrigger
                                                    key={i}
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip id="tooltip-top">Has been ordered</Tooltip>
                                                    }
                                                >
                                                    <div className="seat--list--book bg-success text-white cursor-pointer">
                                                        <p className="my-auto">{i}</p>
                                                    </div>
                                                </OverlayTrigger>
                                            ) : (
                                                <ToggleButton
                                                    key={i}
                                                    id={`radio-${i}`}
                                                    type="radio"
                                                    variant="outline-primary"
                                                    className="seat--list"
                                                    name="radio"
                                                    value={radio.value}
                                                    checked={requestBody.numChair.toString() === radio.value}
                                                    onChange={(e) => setRequestBody({ ...requestBody, numChair: parseInt(e.currentTarget.value) })}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            )
                                        )
                                    })}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4" className="mb-4">
                        <Card>
                            <Card.Body>
                                <p className="fs-5 mb-3 fw-bold">Booking Now</p>
                                <div className="mb-4">
                                    <div className="d-flex mb-2">
                                        <Pin />
                                        <label className="ms-2">Identify Number</label>
                                    </div>
                                    <Form.Control type="text" name="ktp" value={requestBody.ktp} onChange={(e) => onChangeHandler(e)} placeholder="KTP / VISA / Passport . . ." />
                                </div>
                                <div className="mb-4">
                                    <div className="d-flex mb-2">
                                        <AssignmentInd />
                                        <label className="ms-2">Booking As</label>
                                    </div>
                                    <Form.Control type="text" name="orderBy" value={requestBody.orderBy} onChange={(e) => onChangeHandler(e)} placeholder="Enter your name . . ." />
                                </div>
                                <div className="mb-4">
                                    <div className="d-flex mb-2">
                                        <AirlineSeatReclineExtra />
                                        <label className="ms-2">Seat Number</label>
                                    </div>
                                    <p className="bg-secondary text-white text-center rounded py-1">{requestBody.numChair}</p>
                                </div>

                                {returnNumber.length !== 0 ? (
                                    <div className="mb-4">
                                        <div className="d-flex mb-2">
                                            <AirlineSeatReclineExtra />
                                            <label className="ms-2">Return Seat Number</label>
                                        </div>
                                        <Select
                                            options={returnNumber}
                                            onChange={(e) => setRequestBody({ ...requestBody, returnTicketChair: e.value })}
                                            placeholder="Choose number . . ."
                                        />
                                    </div>
                                ) : ""}

                                <button className="btn--shop" onClick={(e) => onSubmitHandler(e)}>Continue Transaction</button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {localStorage.getItem("category") ? (
                        <>
                            {data.returnTicket.length !== 0 ? <p className="fs-5 mb-4 fw-bold">Booking for return ticket also</p> : <p className="fs-5 mt-3 fw-bold text-danger">Saat ini tiket pulang tidak tersedia</p>}
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
                                {data.returnTicket.map((ticket, index) => {
                                    return (
                                        <div key={index} className="d-flex align-items-stretch me-4">
                                            <Card className="w-100 mb-4 card-container">
                                                <Card.Body className="w-100 card-content">
                                                    <input type="radio" value={ticket.id} onChange={(e) => onChangeHandler(e)} name="returnTicketId" />
                                                    <p style={{ color: "#2F82FF" }}>{moment(ticket.takeOff).format('LL')}</p>
                                                    <Row>
                                                        <Col md="5">
                                                            <p className="text-muted mb-0">From</p>
                                                            <p className="fw-bold m-0 text-truncate">{ticket.departure.split(",")[1] || ticket.departure}</p>
                                                            <p style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                                            <p>{moment(ticket.takeOff).format('LT')}</p>
                                                        </Col>
                                                        <Col md="2" className="text-center my-auto" style={{ rotate: "90deg", color: "#2F82FF" }}>
                                                            <i className="bi bi-airplane fs-5"></i>
                                                        </Col>
                                                        <Col md="5">
                                                            <p className="text-muted mb-0">To</p>
                                                            <p className="fw-bold m-0 text-truncate">{ticket.destination.split(",")[1] || ticket.destination}</p>
                                                            <p style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                                            <p>{moment(ticket.arrive).format('LT')}</p>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <p className="my-auto text-white">Rp{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </>
                    ) : ""}


                </Row>
            ) : (<LoadingSquare />)
            }
        </Container >
    );
}
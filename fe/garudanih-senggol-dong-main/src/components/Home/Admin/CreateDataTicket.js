import axios from 'axios';
import moment from "moment"
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import LoadingSpinner from '../../LoadingSpinner';
import { AirlineSeatReclineExtra, CalendarMonth, FamilyRestroom, Public } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { OutlinedInput } from "@mui/material";

export default function CreateDataTicket() {
    const [loading, setLoading] = useState(false)
    const [takeOff, setTakeOff] = useState(moment())
    const [arrive, setArrive] = useState(moment())
    const [reqBody, setReqBody] = useState({
        departure: "",
        departureCode: "",
        destination: "",
        destinationCode: "",
        type: "",
        class: "",
        price: 0,
        totalChair: 0,
        flight: ""
    })

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        if (e.target.name.includes("Code")) {
            setReqBody({ ...reqBody, [e.target.name]: e.target.value.toUpperCase() })
        } else {
            setReqBody({ ...reqBody, [e.target.name]: e.target.value })
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        console.log({ ...reqBody, takeOff: takeOff._d, arrive: arrive._d })
        setLoading(true)

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/ticket`,
            timeout: 120000,
            data: { ...reqBody, takeOff: takeOff._d, arrive: arrive._d }
        }).then(() => {
            navigate("/admin/ticket")
            setLoading(false)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div className="p-3">
            <div className="d-flex">
                <AirplaneTicketIcon fontSize="large" className="text-white p-1 rounded" style={{ background: "#2F82FF" }} />
                <p className="fs-4 fw-bold ms-2 my-auto">Ticket<span className="text-muted fs-4 ms-2 fw-normal">/ Create</span></p>
            </div>
            <div className="my-3 bg-white p-4 rounded form-user-create">
                <Row>
                    <Col md="5">
                        <div className="d-flex mb-2">
                            <FlightTakeoffIcon />
                            <label className="ms-2">Departure</label>
                        </div>
                        <Form.Control type="text" name="departure" className="mb-4" value={reqBody.departure} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Airport name . . ." required />
                    </Col>
                    <Col md="1">
                        <div className="d-flex mb-2">
                            <label>ICAO</label>
                        </div>
                        <Form.Control type="text" name="departureCode" className="mb-4" value={reqBody.departureCode} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="-  -  -" maxLength={3} required />
                    </Col>
                    <Col md="5">
                        <div className="d-flex mb-2">
                            <FlightLandIcon />
                            <label className="ms-2">Destination</label>
                        </div>
                        <Form.Control type="text" name="destination" className="mb-4" value={reqBody.destination} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Airport name . . ." required />
                    </Col>
                    <Col md="1">
                        <div className="d-flex mb-2">
                            <label>ICAO</label>
                        </div>
                        <Form.Control type="text" name="destinationCode" className="mb-4" value={reqBody.destinationCode} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="-  -  -" maxLength={3} required />
                    </Col>
                    <Col md="3" className="mb-4">
                        <div className="d-flex mb-2">
                            <CalendarMonth />
                            <label className="ms-2">Take Off</label>
                        </div>
                        {/* <Form.Control type="date" name="takeOff" className="mb-4" value={reqBody.takeOff} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Airport name . . ." required /> */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                value={takeOff}
                                onChange={(e) => setTakeOff(e)}
                                renderInput={(params) => <OutlinedInput sx={{ height: "40px", width: "100%" }} {...params} />}
                            />
                        </LocalizationProvider>
                    </Col>
                    <Col md="3" className="mb-4">
                        <div className="d-flex mb-2">
                            <label>Arrive</label>
                        </div>
                        {/* <Form.Control type="date" name="arrive" className="mb-4" value={reqBody.arrive} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Airport name . . ." required /> */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                value={arrive}
                                onChange={(e) => setArrive(e)}
                                renderInput={(params) => <OutlinedInput sx={{ height: "40px", width: "100%" }} {...params} />}
                            />
                        </LocalizationProvider>
                    </Col>
                    <Col md="3">
                        <div className="d-flex mb-2">
                            <FamilyRestroom />
                            <label className="ms-2">Type</label>
                        </div>
                        <select name="type" defaultValue={reqBody.type} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} className="mb-4" required>
                            <option value="" disabled hidden>Choose Type</option>
                            <option value="Adult">Adult</option>
                            <option value="Child">Child</option>
                        </select>
                    </Col>
                    <Col md="3">
                        <div className="d-flex mb-2">
                            <FlightClassIcon />
                            <label className="ms-2">Class</label>
                        </div>
                        <select name="class" defaultValue={reqBody.class} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} className="mb-4" required>
                            <option value="" disabled hidden>Choose class</option>
                            <option value="First Class">First Class</option>
                            <option value="Business">Business</option>
                            <option value="Economy">Economy</option>
                        </select>
                    </Col>
                    <Col md="3">
                        <div className="d-flex mb-2">
                            <i className="bi bi-cash-stack me-2"></i>
                            <label>Price / seat</label>
                        </div>
                        <Form.Control type="text" name="price" className="mb-4" value={reqBody.price} autoComplete="off" placeholder="Price ticket . . ." required
                            onChange={(e) => onChangeHandler(e)}
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
                    </Col>
                    <Col md="3">
                        <div className="d-flex mb-2">
                            <AirlineSeatReclineExtra />
                            <label className="ms-2">Total Seat Available</label>
                        </div>
                        <Form.Control type="text" name="totalChair" className="mb-4" value={reqBody.totalChair} autoComplete="off" placeholder="Total seat . . ." required
                            onChange={(e) => onChangeHandler(e)}
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
                    </Col>
                    <Col md="3">
                        <div className="d-flex mb-2">
                            <Public />
                            <label className="ms-2">Flight Type</label>
                        </div>
                        <select name="flight" defaultValue={reqBody.flight} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required>
                            <option value="" disabled hidden>Choose flight</option>
                            <option value="Domestic">Domestic</option>
                            <option value="International">International</option>
                        </select>
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-end">
                <Link to="/admin/ticket" className="btn btn-danger mx-3"><i className="bi bi-x-lg me-2"></i>Cancel</Link>
                <button className="btn btn-primary" onClick={(e) => onSubmitHandler(e)}>{loading ? <LoadingSpinner /> : (
                    <>
                        <i className="bi bi-person-plus-fill me-2"></i>Create New Ticket
                    </>
                )}</button>
            </div>
        </div>
    );
}
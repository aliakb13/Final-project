import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FlightTakeoff, FlightLand, CalendarMonth, FlightClass } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { getFilteredTicket } from '../../../actions/TicketAction'
import Select from "react-select";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { OutlinedInput } from "@mui/material";

export default function FormFilter() {
    const [airportOptions, setAirportOptions] = useState([])
    const [date, setDate] = useState(moment())
    const [returnDate, setReturnDate] = useState(moment())
    const [requestBody, setRequestBody] = useState({
        departure: "",
        destination: "",
        classFlight: "",
        price: 0,
        takeOff: "",
        category: "oneway",
    })

    const dispatch = useDispatch()

    useEffect(() => {
        let arr = []

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/ticket`,
            timeout: 120000,
        }).then((res) => {
            const result = res.data.data.tickets

            result.map((ticket) => {
                const found = arr.some((el) => el.value === ticket.departure)

                if (!found) arr.push({ value: ticket.departure, label: ticket.departure })

                return null
            })

            setAirportOptions(arr)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const onChangeHandler = (e) => {
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
    }

    const handleFilter = (e) => {
        e.preventDefault()

        if (requestBody.category === "oneway") {
            dispatch(getFilteredTicket({ ...requestBody, takeOff: date._d }))
        } else {
            dispatch(getFilteredTicket({ ...requestBody, takeOff: date._d, returnDate: returnDate._d }))
        }

    }

    const handleReset = () => {
        setRequestBody({
            departure: "",
            destination: "",
            classFlight: "",
            price: 0,
            takeOff: "",
            category: "oneway",
        })

        setDate(null)
        setReturnDate(null)

        dispatch(getFilteredTicket({ reset: true }))
    }

    return (
        <Form onSubmit={(e) => handleFilter(e)}>
            <Row className="d-flex">
                <Col md="6" className="mb-4">
                    <div className="d-flex mb-2">
                        <FlightTakeoff />
                        <label className="ms-2">Departure</label>
                    </div>
                    <Select
                        options={airportOptions}
                        onChange={(e) => setRequestBody({ ...requestBody, departure: e.value })}
                        placeholder="Airport or city . . ."
                    />
                </Col>
                <Col md="6" className="mb-4">
                    <div className="d-flex mb-2">
                        <FlightLand />
                        <label className="ms-2">Destination</label>
                    </div>
                    <Select
                        options={airportOptions}
                        onChange={(e) => setRequestBody({ ...requestBody, destination: e.value })}
                        placeholder="Airport or city . . ."
                    />
                </Col>
                <Col sm="6" md="3" className="mb-4">
                    <div className="d-flex mb-3">
                        <CalendarMonth />
                        <label className="ms-2">Category</label>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Form.Check
                            checked={requestBody.category === "oneway"}
                            type="radio"
                            name="category"
                            value="oneway"
                            label="One Way"
                            onChange={(e) => onChangeHandler(e)}
                        />
                        <Form.Check
                            checked={requestBody.category === "roundtrip"}
                            type="radio"
                            name="category"
                            value="roundtrip"
                            label="Round Trip"
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>
                </Col>
                <Col sm="6" md="3" className="mb-4">
                    <div className="d-flex mb-2">
                        <CalendarMonth />
                        <label className="ms-2">Take Off</label>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDateTimePicker
                            value={date}
                            onChange={(e) => setDate(e)}
                            renderInput={(params) => <OutlinedInput sx={{ height: "40px", width: "100%" }} {...params} />}
                        />
                    </LocalizationProvider>
                </Col>
                {requestBody.category === "roundtrip" ? (
                    <Col sm="6" md="3" className="mb-4">
                        <div className="d-flex mb-2">
                            <CalendarMonth />
                            <label className="ms-2">Return Date</label>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                                value={returnDate}
                                onChange={(e) => setReturnDate(e)}
                                renderInput={(params) => <OutlinedInput sx={{ height: "40px", width: "100%" }} {...params} />}
                            />
                        </LocalizationProvider>
                    </Col>
                ) : ""}
                <Col sm="6" md="3" className="mb-4">
                    <div className="d-flex mb-2">
                        <FlightClass />
                        <label className="ms-2">Class</label>
                    </div>
                    <select name="classFlight" defaultValue={requestBody.classFlight} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required>
                        <option value="" disabled hidden>Choose class</option>
                        <option value="First Class">First Class</option>
                        <option value="Business">Business</option>
                        <option value="Economy">Economy</option>
                    </select>
                </Col>
                <Col sm="6" md="3" className="mb-4">
                    <div className="d-flex mb-2">
                        <i className="bi bi-cash-stack me-2"></i>
                        <label>Price (optional)</label>
                    </div>
                    <Form.Control type="text" name="price" value={requestBody.price} autoComplete="off" placeholder="Price ticket . . ." required
                        onChange={(e) => onChangeHandler(e)}
                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
                </Col>
                <Col className="d-flex mt-auto mb-4" style={{ height: "40px" }}>
                    <button type="submit" className="btn btn-primary w-100 me-2">Search</button>
                    <button type="reset" onClick={() => handleReset()} className=" btn btn-outline-danger w-100 ms-2">Clear</button>
                </Col>
            </Row>
        </Form>
    );
}
import './modal.css';
import axios from "axios"
import moment from "moment";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import LoadingCircle from '../Loader/LoadingCircle';

export default function PayingModal(props) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onProcessTransaction = () => {
        setLoading(true)

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/trans/paid/${props.datatransc.id}`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${props.accesstoken}`
            }
        })
            .then((res) => {
                console.log(res.data)
                navigate("/")
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {loading ? (
                    <>
                        <Modal.Header closeButton className="border-0">
                            <Modal.Title id="contained-modal-title-vcenter">
                                Please waiting
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LoadingCircle styled="d-flex justify-content-center" />
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center border-0">
                            <p>This process takes several time</p>
                        </Modal.Footer>
                    </>
                ) : (
                    <>
                        <Modal.Header closeButton className="border-0">
                            <Modal.Title id="contained-modal-title-vcenter">
                                {props.datatransc.from === "paidProcess" ? "Payment Confirmation" : "Transaction Information"}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-between">
                                <p className="fw-bold my-auto">{props.dataticket.code}</p>
                                <p className="my-auto">{moment(props.dataticket.takeOff).format('LL')}</p>
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
                                    <p className="fs-5">{props.dataticket.departure}</p>
                                    <p className="fw-bold" style={{ color: "#2F82FF" }}>({props.dataticket.departureCode})</p>
                                    <p>{moment(props.dataticket.takeOff).format('LT')}</p>
                                </div>
                                <div className="d-flex flex-column text-end ms-3">
                                    <p className="fs-5">{props.dataticket.destination}</p>
                                    <p className="fw-bold" style={{ color: "#2F82FF" }}>({props.dataticket.destinationCode})</p>
                                    <p>{moment(props.dataticket.arrive).format('LT')}</p>
                                </div>
                            </div>
                            <hr style={{ borderColor: "#2F82FF", borderWidth: "3px" }} />
                            <Row>
                                <Col sm="6" md="4" className="text-center mb-3">
                                    <p className="text-muted m-0">Passenger Name</p>
                                    <p className="fw-bold m-0">{props.datatransc.orderBy}</p>
                                </Col>
                                <Col sm="6" md="4" className="text-center mb-3">
                                    <p className="text-muted m-0">Seat Number</p>
                                    <p className="fw-bold m-0">{props.datatransc.numChair}</p>
                                </Col>
                                <Col sm="6" md="4" className="text-center mb-3">
                                    <p className="text-muted m-0">Price</p>
                                    <p className="fw-bold m-0">Rp{props.dataticket.price}</p>
                                </Col>
                                <Col sm="6" md="4" className="text-center mb-3">
                                    <p className="text-muted m-0">Class</p>
                                    <p className="fw-bold m-0">{props.dataticket.class}</p>
                                </Col>
                                <Col sm="6" md="4" className="text-center mb-3">
                                    <p className="text-muted m-0">Type</p>
                                    <p className="fw-bold m-0">{props.dataticket.type}</p>
                                </Col>
                                <Col sm="6" md="4" className="text-center mb-3">
                                    <p className="text-muted m-0">Transaction Time</p>
                                    <p className="fw-bold m-0">{moment(props.datatransc.createdAt).format('LL')}</p>
                                </Col>
                            </Row>
                            <hr style={{ borderColor: "#2F82FF", borderWidth: "3px" }} />
                            {props.datatransc.from === "paidProcess" ? <p>Are you sure to booking this ticket?</p> : ""}
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button variant="secondary" onClick={props.onHide}>Close</Button>
                            {props.datatransc.from === "paidProcess" ? <Button onClick={(e) => onProcessTransaction(e)}>Confirm</Button> : ""}
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    );
}
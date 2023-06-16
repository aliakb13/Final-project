import './modal.css';
import moment from "moment";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function DetailTicket(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="d-flex justify-content-between">
                    <p className="fw-bold my-auto">{props.detail.ticket.code}</p>
                    <p className="my-auto">{moment(props.detail.ticket.takeOff).format('LL')}</p>
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
                        <p className="fs-5">{props.detail.ticket.departure}</p>
                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({props.detail.ticket.departureCode})</p>
                        <p>{moment(props.detail.ticket.takeOff).format('LT')}</p>
                    </div>
                    <div className="d-flex flex-column text-end ms-3">
                        <p className="fs-5">{props.detail.ticket.destination}</p>
                        <p className="fw-bold" style={{ color: "#2F82FF" }}>({props.detail.ticket.destinationCode})</p>
                        <p>{moment(props.detail.ticket.arrive).format('LT')}</p>
                    </div>
                </div>
                <hr style={{ borderColor: "#2F82FF", borderWidth: "3px" }} />
                <Row>
                    <Col md="4" className="text-center">
                        <p className="text-muted m-0">Price</p>
                        <p className="fw-bold m-0">Rp{props.detail.ticket.price}</p>
                    </Col>
                    <Col md="4" className="text-center">
                        <p className="text-muted m-0">Class</p>
                        <p className="fw-bold m-0">{props.detail.ticket.class}</p>
                    </Col>
                    <Col md="4" className="text-center">
                        <p className="text-muted m-0">Type</p>
                        <p className="fw-bold m-0">{props.detail.ticket.type}</p>
                    </Col>
                </Row>
                <hr style={{ borderColor: "#2F82FF", borderWidth: "3px" }} />
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Link to={`/admin/ticket/${props.detail.ticket.id}`} className="btn btn-primary text-decoration-none">Edit</Link>
            </Modal.Footer>
        </Modal>
    );
}
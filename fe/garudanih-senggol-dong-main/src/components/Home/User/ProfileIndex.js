import moment from "moment";
import { Cake, MailOutline, Phone, ReceiptLong, Room } from "@mui/icons-material";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionUserHistory } from "../../../actions/UserAction";

export default function ProfileIndex() {
    const [dataTransaction, setDataTransaction] = useState(null)

    const { currentUserData, userHistoryData } = useSelector((state) => state.UserReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("token")

        dispatch(actionUserHistory(token))

    }, [dispatch])

    useEffect(() => {
        let arr = []

        if (userHistoryData) {
            arr = userHistoryData.data.transaction.filter((order) => order.isPaid)

            setDataTransaction({ total: userHistoryData.data.transaction.length, success: arr.length })
        }
    }, [userHistoryData])

    return (
        <Row className="my-4">
            <Col md="5" className="mb-4">
                <Card>
                    <Card.Body>
                        <span>Personal Information</span>
                    </Card.Body>
                    <hr className="my-0" />
                    <Card.Body>
                        <div className="d-flex text-muted">
                            <Cake />
                            <span className="ms-2">Date of Birth<span className="text-black d-block">{moment(currentUserData.birth).format('ll')}</span></span>
                        </div>
                    </Card.Body>
                    <hr className="my-0" />
                    <Card.Body>
                        <div className="d-flex text-muted">
                            <Phone />
                            <span className="ms-2">Contact Number<span className="text-black d-block">{currentUserData.phone}</span></span>
                        </div>
                    </Card.Body>
                    <hr className="my-0" />
                    <Card.Body>
                        <div className="d-flex text-muted">
                            <MailOutline />
                            <span className="ms-2">Email<span className="text-black d-block">{currentUserData.email}</span></span>
                        </div>
                    </Card.Body>
                    <hr className="my-0" />
                    <Card.Body>
                        <div className="d-flex text-muted">
                            <Room />
                            <span className="ms-2">Current Location<span className="text-black d-block">{currentUserData.city}</span></span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md="7">
                <Card>
                    <Card.Body>
                        <span>Usage Details</span>
                    </Card.Body>
                    <hr className="my-0" />
                    <Card.Body>
                        <div className="d-flex text-muted">
                            <ReceiptLong />
                            <div className="ms-2 w-100">
                                <span>Transaction</span>
                                {dataTransaction ? (
                                    <>
                                        <ProgressBar now={dataTransaction.success} max={dataTransaction.total} className="my-3 rounded-0" />
                                        <span className="fw-bold">{dataTransaction.success} of {dataTransaction.total} success<span className="ms-2 fw-normal text-muted">({Math.floor((dataTransaction.success/dataTransaction.total)*100)}% of total transaction successfully)</span></span>
                                    </>
                                ) : ""}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
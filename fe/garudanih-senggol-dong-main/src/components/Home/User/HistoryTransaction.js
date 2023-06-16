import axios from "axios";
import moment from "moment";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import PayingModal from "../../Modal/PayingModal";
import DeleteModal from "../../Modal/DeleteModal";

export default function HistoryTransaction() {
    const [rows, setRows] = useState([])
    const [modalPaying, setModalPaying] = useState(false)
    const [idForPaying, setIdForPaying] = useState(null)
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/user/history`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                setRows(res.data.data.transaction)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onPaymentHandle = (e, data) => {
        setModalPaying(true)
        setIdForPaying({ ...data, from: e.target.name })
    }

    const onCancelFlightHandle = (e, data) => {
        setModalShow(true)
        setIdForPaying({ ...data, from: e.target.name })
    }

    const columns = [
        { field: 'code', headerName: 'Transaction Code', width: 170 },
        {
            field: "Status",
            width: 170,
            renderCell: (cellValues) => {
                if (cellValues.row.isPaid) {
                    return <p className="text-success mt-auto">Successful payment</p>
                } if (!cellValues.row.notCancelled) {
                    return <p className="text-secondary mt-auto">Transaction cancelled</p>
                } else {
                    return <p className="text-danger mt-auto">Waiting for payment</p>
                }
            }
        },
        { field: 'orderBy', headerName: 'Passenger', width: 170 },
        {
            field: 'createdAt',
            headerName: 'Booking Date',
            width: 210,
            valueGetter: (params) => moment(params.row.createdAt).format('LLL')
        },
        {
            field: 'takeOff',
            headerName: 'Take off Schadule',
            width: 210,
            valueGetter: (params) => moment(params.row.date).format('LLL')
        },
        {
            field: "Action",
            width: 270,
            renderCell: (cellValues) => {
                if (!cellValues.row.notCancelled) {
                    return <Button name="paidInfo" variant="secondary" onClick={(e) => onPaymentHandle(e, cellValues.row)}>More info</Button>;
                } if (!cellValues.row.isPaid) {
                    return <div>
                        <Button name="cancelProcess" variant="danger" className="me-3" onClick={(e) => onCancelFlightHandle(e, cellValues.row)}>Cancel flight</Button>
                        <Button name="paidProcess" onClick={(e) => onPaymentHandle(e, cellValues.row)}>Paying ticket</Button>
                    </div>;
                } else {
                    return <Button name="paidInfo" variant="secondary" onClick={(e) => onPaymentHandle(e, cellValues.row)}>More info</Button>;
                }

            }
        }
    ];

    return (
        <Container>
            <h3>Transaction History</h3>
            <p>List of transactions that you have ever made</p>
            <div style={{ height: 650, width: '100%', background: "white" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    pagination
                />
                {idForPaying ? (
                    <>
                        <PayingModal
                            show={modalPaying}
                            onHide={() => setModalPaying(false)}
                            datatransc={idForPaying}
                            dataticket={idForPaying.ticket}
                        />
                        <DeleteModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            datatransc={idForPaying}
                            dataticket={idForPaying.ticket}
                        />
                    </>
                ) : ""}
            </div>
        </Container>
    );
}
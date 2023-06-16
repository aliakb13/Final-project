import "./admin.css";
import axios from "axios";
import moment from "moment";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { HighlightOff } from "@mui/icons-material";
import DeleteModal from '../../Modal/DeleteModal';

export default function FetchingDataTransc() {
    const [rows, setRows] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/trans`,
            timeout: 120000
        })
            .then((res) => {
                setRows(res.data.data.transaction)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'code', headerName: 'Transaction Code', width: 170 },
        { field: 'orderBy', headerName: 'Passenger', width: 170 },
        { field: 'numChair', headerName: 'Number Seat', width: 130 },
        { field: 'ticketCode', headerName: 'Ticket Code', width: 170 },
        { field: 'ktp', headerName: 'Number Identify', width: 130 },
        {
            field: 'createdAt',
            headerName: 'Booking Date',
            width: 210,
            valueGetter: (params) => moment(params.row.createdAt).format('LLL')
        },
        {
            field: "Action",
            renderCell: (cellValues) => {
                return <button onClick={() => {
                    setModalShow(true)
                    setId(cellValues.row.id)
                }} className="bg-danger text-white p-1 rounded-circle"><HighlightOff /></button>;
            }
        }
    ];

    return (
        <div style={{ height: 650, width: '100%', background: "white" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                pagination
            // onRowClick={handleRowClick}
            />
            <DeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                dataid={id}
                target="trans"
            />
        </div>
    );
}
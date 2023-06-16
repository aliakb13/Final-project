import "./admin.css";
import axios from "axios";
import moment from "moment";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FetchingDataUser() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/admin/all`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                setRows(res.data.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 130 },
        { field: 'isExist', headerName: 'Exist', width: 130 },
        {
            field: 'birth',
            headerName: 'Birth Date',
            width: 170,
            valueGetter: (params) => moment(params.row.birth).format('LL') || ""
        },
        {
            field: "Action",
            renderCell: (cellValues) => {
                return <Link to={`${cellValues.row.id}`} className="btn-table">Edit</Link>;
            }
        }
    ];

    return (
        <div style={{ height: 400, width: '100%', background: "white" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                pagination
            // onRowClick={handleRowClick}
            />
        </div>
    )
}
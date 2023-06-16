import './modal.css';
import axios from "axios"
import { Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import LoadingCircle from '../Loader/LoadingCircle';

export default function DeleteModal(props) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onDeletedHandler = () => {
        setLoading(true)

        const token = localStorage.getItem("token")

        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/${props.target}/${props.dataid}`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {
            navigate("/")
            setLoading(false)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const onCancelTransc = () => {
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/trans/cancel/${props.datatransc.id}`,
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
                    <Modal.Header closeButton className="border-0 text-danger">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Warning!!!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.datatransc ? (
                            <p>Are you sure want to cancel transaction data with Id : <span className="text-danger fw-bold">{props.datatransc.id}</span>, permanently ?</p>
                        ) : (
                            <p>Are you sure want to delete data with Id : <span className="text-danger fw-bold">{props.dataid}</span>, permanently ?</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-nowrap border-0">
                        <Button onClick={props.onHide} className="w-100" style={{ borderRadius: "0 10px 0 10px" }}>Cancel</Button>
                        {props.datatransc ? (
                            <Button variant="secondary" onClick={onCancelTransc} className="w-100" style={{ borderRadius: "10px 0 10px 0" }}>Yes, sure</Button>
                        ) : (
                            <Button variant="secondary" onClick={onDeletedHandler} className="w-100" style={{ borderRadius: "10px 0 10px 0" }}>Yes, sure</Button>
                        )}
                    </Modal.Footer>
                </>
            )}

        </Modal>
    );
}
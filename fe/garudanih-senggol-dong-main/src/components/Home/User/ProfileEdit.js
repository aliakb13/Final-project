import moment from 'moment';
import imgHolder from '../../../assets/logo.svg';
import LoadingSpinner from '../../LoadingSpinner'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { Card, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Cake, MailOutline, Person, Phone, Room } from "@mui/icons-material";
import { actionUserUpdate } from "../../../actions/UserAction";

export default function ProfileEdit() {
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState(imgHolder)
    const [loading, setLoading] = useState(false)

    const { currentUserData, userUpdateResult } = useSelector((state) => state.UserReducer)

    const [body, setBody] = useState({
        name: "",
        email: "",
        city: "",
        birth: "",
        phone: "",
        image: null,
    })

    const fileRef = useRef()
    const dispatch = useDispatch()

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (currentUserData) {
            setBody({
                name: currentUserData.name,
                email: currentUserData.email,
                city: currentUserData.city,
                birth: currentUserData.birth,
                phone: currentUserData.phone,
            })

            if (currentUserData.image) setImageFile(currentUserData.image)
        }
    }, [currentUserData])

    useEffect(() => {
        if (userUpdateResult) {
            setOpen(true)

            const timer = setTimeout(() => {
                dispatch({ type: "RESET_MESSAGE" })
            }, 2500)

            return () => clearTimeout(timer)
        }

    }, [dispatch, userUpdateResult])

    const onChangeHandler = (e) => {
        setBody({ ...body, [e.target.name]: e.target.value })
    }

    const onImageHandler = () => {
        const image = fileRef.current.files[0]
        const reader = new FileReader()
        
        reader.readAsDataURL(image)

        reader.addEventListener('load', () => {
            setImageFile(reader.result)
            
            setBody({ ...body, image: image })
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData();

        if (body.image) formData.append("image", body.image);

        formData.append("name", body.name);
        formData.append("email", body.email);
        formData.append("city", body.city);
        formData.append("birth", body.birth);
        formData.append("phone", body.phone);

        dispatch(actionUserUpdate(formData, token))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Card className="my-4 border-0">
            {userUpdateResult ? (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {userUpdateResult.message}
                    </Alert>
                </Snackbar>
            ) : ""}
            <Form onSubmit={(e) => onSubmitHandler(e)}>
                {body ? (
                    <Row className="p-4">
                        <Col md="8">
                            <div className="d-flex mb-2">
                                <Person />
                                <label className="ms-2">Name</label>
                            </div>
                            <Form.Control type="text" name="name" className="input-group mb-4" value={body.name || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} autoComplete="off" required />
                            <div className="d-flex mb-2">
                                <MailOutline />
                                <label className="ms-2">Email</label>
                            </div>
                            <Form.Control type="text" name="email" className="input-group mb-4" value={body.email || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="d-flex mb-2">
                                        <Cake />
                                        <label className="ms-2">Birth</label>
                                    </div>
                                    <Form.Control type="date" name="birth" className="input-group" value={moment(body.birth).format("YYYY-MM-DD") || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                                </div>
                                <div className="mx-3">
                                    <div className="d-flex mb-2">
                                        <Room />
                                        <label className="ms-2">City</label>
                                    </div>
                                    <Form.Control type="text" name="city" className="input-group" value={body.city || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                                </div>
                                <div>
                                    <div className="d-flex mb-2">
                                        <Phone />
                                        <label className="ms-2">Phone</label>
                                    </div>
                                    <Form.Control type="text" name="phone" className="input-group" value={body.phone || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                                </div>
                            </div>
                        </Col>
                        <Col md="4">
                            <p>Image Profile</p>
                            <img src={imageFile} alt="img-profile" style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "20px" }} required />
                            <input type="file" ref={fileRef} onChange={onImageHandler} />
                        </Col>
                    </Row>
                ) : ""}
                <Card.Footer className="d-flex bg-white p-4">
                    <button type="submit" className="btn btn-primary">{loading ? <LoadingSpinner /> : (
                        <>
                            <i className="bi bi-save2-fill me-2"></i>Save Changes
                        </>
                    )}</button>
                </Card.Footer>
            </Form>
        </Card>
    );
}
import axios from 'axios';
import imgHolder from '../../../assets/logo.svg';
import { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import LoadingSpinner from '../../LoadingSpinner';

export default function CreateDataUser() {
    const [imageFile, setImageFile] = useState(imgHolder)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const fileRef = useRef()
    const navigate = useNavigate()

    const [body, setBody] = useState({
        name: "",
        email: "",
        city: "",
        birth: "",
        phone: "",
        password: "",
        image: null,
    })

    const token = localStorage.getItem("token");

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

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData();

        if (body.image) formData.append("image", body.image);

        formData.append("name", body.name);
        formData.append("email", body.email);
        formData.append("city", body.city);
        formData.append("password", body.password);
        formData.append("birth", body.birth);
        formData.append("phone", body.phone);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/admin/register`,
            timeout: 120000,
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                navigate("/admin/user")
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <div className="p-3">
            <div className="d-flex">
                <i className="bi bi-people-fill text-white px-2 py-1 rounded fs-4" style={{ background: "#2F82FF" }}></i>
                <p className="fs-4 fw-bold ms-2 my-auto">Our Users<span className="text-muted fs-4 ms-2 fw-normal">/ Create</span></p>
            </div>
            <div className="my-3 bg-white p-4 rounded form-user-create">
                <Row>
                    <Col md="8" className="mb-4">
                        <div className="d-flex mb-2">
                            <i className="bi bi-person-fill me-2"></i>
                            <label>Name</label>
                        </div>
                        <Form.Control type="text" name="name" className="mb-4" value={body.name} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Enter full name . . ." required />
                        <div className="d-flex mb-2">
                            <i className="bi bi-envelope-at-fill me-2"></i>
                            <label>Email</label>
                        </div>
                        <Form.Control type="text" name="email" className="mb-4" value={body.email} onChange={(e) => onChangeHandler(e)} autoComplete="off" placeholder="Enter email . . ." required />
                        <div className="d-flex justify-content-between mb-4">
                            <div className="me-2">
                                <div className="d-flex mb-2">
                                    <i className="bi bi-lock-fill me-2"></i>
                                    <label>Password</label>
                                </div>
                                <Form.Control type="password" name="password" value={body.password} onChange={(e) => onChangeHandler(e)} placeholder="Enter password . . ." required />
                            </div>
                            <div className="ms-2">
                                <div className="d-flex mb-2">
                                    <i className="bi bi-lock-fill me-2"></i>
                                    <label>Confirm Password</label>
                                </div>
                                <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-type your password . . ." required />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <div className="d-flex mb-2">
                                    <i className="bi bi-calendar me-2"></i>
                                    <label>Birth</label>
                                </div>
                                <Form.Control type="date" name="birth" value={body.birth} onChange={(e) => onChangeHandler(e)} required />
                            </div>
                            <div className="mx-3">
                                <div className="d-flex mb-2">
                                    <i className="bi bi-geo-fill me-2"></i>
                                    <label>City</label>
                                </div>
                                <Form.Control type="text" name="city" value={body.city} onChange={(e) => onChangeHandler(e)} placeholder="Enter city . . ." required />
                            </div>
                            <div>
                                <div className="d-flex mb-2">
                                    <i className="bi bi-phone-fill me-2"></i>
                                    <label>Phone</label>
                                </div>
                                <Form.Control type="text" name="phone" value={body.phone} onChange={(e) => onChangeHandler(e)} placeholder="08xx xxxx xx99" required />
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <p>Image Profile</p>
                        <img src={imageFile} alt="img-profile" style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "20px" }} required />
                        <input type="file" ref={fileRef} onChange={onImageHandler} />
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-end">
                <Link to="../admin/user" className="btn btn-danger mx-3"><i className="bi bi-x-lg me-2"></i>Cancel</Link>
                <button className="btn btn-primary" onClick={(e) => onSubmitHandler(e)}>{loading ? <LoadingSpinner /> : (
                    <>
                        <i className="bi bi-person-plus-fill me-2"></i>Create New user
                    </>
                )}</button>
            </div>
        </div>
    );
}
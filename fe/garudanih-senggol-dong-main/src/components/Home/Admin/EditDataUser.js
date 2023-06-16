import axios from 'axios';
import moment from 'moment';
import imgHolder from '../../../assets/logo.svg';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState, useRef } from 'react';
import DeleteUserModal from '../../Modal/DeleteUserModal';
import LoadingSpinner from '../../LoadingSpinner'

export default function EditDataUser() {
    const [imageFile, setImageFile] = useState(imgHolder)
    const [modalShow, setModalShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const fileRef = useRef()
    const navigate = useNavigate()

    const [body, setBody] = useState({
        name: "",
        email: "",
        city: "",
        birth: "",
        phone: "",
        image: null,
    })

    const { id } = useParams()

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/admin/detail/${id}`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                setBody({
                    name: res.data.data.name,
                    email: res.data.data.email,
                    city: res.data.data.city,
                    birth: res.data.data.birth,
                    phone: res.data.data.phone,
                })

                if (res.data.data.image) setImageFile(res.data.data.image)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, token])

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
        formData.append("birth", body.birth);
        formData.append("phone", body.phone);

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/admin/update/${id}`,
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
                <p className="fs-4 fw-bold ms-2 my-auto">Our Users<span className="text-muted fs-4 ms-2 fw-normal">/ Edit</span></p>
            </div>
            <div className="my-3 bg-white p-4 rounded">
                <Row>
                    <Col md="8">
                        <div className="d-flex mb-2">
                            <i className="bi bi-person-fill me-2"></i>
                            <label>Name</label>
                        </div>
                        <input type="text" name="name" className="input-group mb-4" value={body.name || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} autoComplete="off" required />
                        <div className="d-flex mb-2">
                            <i className="bi bi-envelope-at-fill me-2"></i>
                            <label>Email</label>
                        </div>
                        <input type="text" name="email" className="input-group mb-4" value={body.email || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                        <div className="d-flex justify-content-between">
                            <div>
                                <div className="d-flex mb-2">
                                    <i className="bi bi-calendar me-2"></i>
                                    <label>Birth</label>
                                </div>
                                <input type="date" name="birth" className="input-group" value={moment(body.birth).format("YYYY-MM-DD") || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                            </div>
                            <div className="mx-3">
                                <div className="d-flex mb-2">
                                    <i className="bi bi-geo-fill me-2"></i>
                                    <label>City</label>
                                </div>
                                <input type="text" name="city" className="input-group" value={body.city || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
                            </div>
                            <div>
                                <div className="d-flex mb-2">
                                    <i className="bi bi-phone-fill me-2"></i>
                                    <label>Phone</label>
                                </div>
                                <input type="text" name="phone" className="input-group" value={body.phone || ""} onChange={(e) => onChangeHandler(e)} style={{ width: "100%", height: "40px" }} required />
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
            <div className="d-flex">
                <button className="btn btn-danger me-auto" onClick={() => setModalShow(true)}><i className="bi bi-trash-fill me-2"></i>Delete Account</button>
                <Link to="../admin/user" className="btn btn-danger mx-3"><i className="bi bi-x-lg me-2"></i>Cancel</Link>
                <button className="btn btn-primary" onClick={(e) => onSubmitHandler(e)}>{loading ? <LoadingSpinner /> : (
                    <>
                        <i className="bi bi-save2-fill me-2"></i>Save Changes
                    </>
                )}</button>
            </div>
            <DeleteUserModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                userid={id}
                username={body.name}
                accesstoken={token}
            />
        </div>
    );
}
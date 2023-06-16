import imgLogo from '../../assets/logo.svg';
import axios from 'axios';
import io from "socket.io-client";
import moment from 'moment';
import { Container, Image, Nav, Navbar, NavDropdown, Offcanvas, Dropdown, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogout } from '../../actions/UserAction';
import LoadingSpinner from '../LoadingSpinner';
import React, { useEffect, useState } from "react"
import { AirplanemodeActive, Bookmarks, ExitToApp, NotificationsNone, PersonOutlined } from '@mui/icons-material';

export default function NavUser() {
    const [notification, setNotification] = useState([]);
    const [socket, setSocket] = useState(null);
    const [count, setCount] = useState(0)
    const [wishlist, setWishlist] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUserData } = useSelector((state) => state.UserReducer)

    function handleLogout() {
        dispatch(actionUserLogout())
        navigate("/login")
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </div>
    ));

    useEffect(() => {
        setSocket(io(`${process.env.REACT_APP_LOCAL_URL}`))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token")

        const interval = setInterval(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_LOCAL_URL}/v1/user/notify`,
                timeout: 120000,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    const filtering = res.data.data.filter((notify) => !notify.isRead)
                    console.log(res.data.data)
                    setNotification(filtering)
                    setCount(filtering.length)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }, 5000)

        // axios({
        //     method: 'GET',
        //     url: `${process.env.REACT_APP_LOCAL_URL}/v1/user/notify`,
        //     timeout: 120000,
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then((res) => {
        //         socket?.emit("lts notify", res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err.message)
        //     })


        //     const interval = setInterval(() => {
        //         socket?.on("show notify", body => {
        //             const filtering = body.data.filter((notify) => !notify.isRead)
        //             setNotification(filtering)
        //             setCount(filtering.length)
        //         });
        //     }, 5000)

        return () => {
            clearInterval(interval)
        }

        // socket?.on("show notify", body => {
        //     const filtering = body.data.filter((notify) => !notify.isRead)
        //     setNotification(filtering)
        //     setCount(filtering.length)
        // });
    }, [socket])

    useEffect(() => {
        const token = localStorage.getItem("token")

        const interval = setInterval(() => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_LOCAL_URL}/v1/user/wishlist`,
                timeout: 120000,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                setWishlist(res.data.data.wishlist)
            }).catch((err) => {
                console.log(err.response.data.errors)
            })
        }, 5000)

        return () => {
            clearInterval(interval)
        }

    }, [])

    const onReadHandler = (id) => {
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/notify/${id}`,
            timeout: 120000
        })
            .then(() => console.log("Success read process"))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Navbar key="lg" expand="lg" style={{ background: 'transparent' }}>
                <Container>
                    <Link to={"/"} className="navbar-brand">
                        <AirplanemodeActive className="brand-icon" />
                        <p>GarudaNih</p>
                    </Link>
                    <div className="d-flex justify-content-end">
                        <Dropdown className="my-auto me-3" align="end">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                {currentUserData ? (
                                    <button className="btn--notification">
                                        <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px", top: 8, left: 35 }}>{wishlist.length}</span>
                                        <Bookmarks />
                                    </button>
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="user--notif--dropdown">
                                {wishlist.length !== 0 ? (
                                    wishlist.map((item, index) => {
                                        return (
                                            <div key={index} className="user--notif--item">
                                                <div>
                                                    <p className="user--notif--desc"><span className="fw-bold">From : </span>{item.detailTicket.departureCode} - {item.detailTicket.departure}</p>
                                                    <p className="user--notif--desc"><span className="fw-bold">To : </span>{item.detailTicket.destinationCode} - {item.detailTicket.destination}</p>
                                                    <span className="text-muted"><span className="text-black">Take off : </span>{moment(item.detailTicket.takeOff).format('ll')}</span>
                                                </div>
                                                <Link to={`ticket/${item.ticketId}`} className="btn btn-outline-dark align-self-center ms-auto">Detail</Link>
                                            </div>
                                        )
                                    })
                                ) : ""}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="my-auto me-3" align="end">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                {currentUserData ? (
                                    <button className="btn--notification">
                                        <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px", top: 8, left: 35 }}>{count}</span>
                                        <NotificationsNone />
                                    </button>
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="user--notif--dropdown">
                                {notification.length !== 0 ? (
                                    notification.map((item, index) => {
                                        return !item.isRead ? (
                                            <div key={index} className="user--notif--item">
                                                <div>
                                                    <p className="user--notif--desc">{item.desc}</p>
                                                    <span className="text-muted">{moment(item.createdAt).startOf('hour').fromNow()}</span>
                                                </div>
                                                <Button variant="outline-dark" className="align-self-center" onClick={() => onReadHandler(item.id)}>Read</Button>
                                            </div>
                                        ) : (
                                            <>
                                                <div key={index} className="d-flex px-2 bg-secondary">
                                                    <div style={{ width: "200px" }}>
                                                        <p className="mb-0" style={{ fontSize: "12px" }}>{item.desc}</p>
                                                        <p className="text-white">{moment(item.createdAt).fromNow()}</p>
                                                    </div>
                                                </div>
                                                <Dropdown.Divider />
                                            </>
                                        )
                                    })
                                ) : ""}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="pe-3">
                                    <Link to={"ticket"} className="navbar-link my-auto">Ticket</Link>
                                    <Link to={"transaction"} className="navbar-link my-auto">History</Link>
                                    <NavDropdown
                                        id={`offcanvasNavbarDropdown-expand-lg`}
                                        title={
                                            <div className="user-image d-flex">
                                                {currentUserData ? (
                                                    <>
                                                        <Image
                                                            src={currentUserData.image || imgLogo}
                                                            alt="user img"
                                                            roundedCircle
                                                            thumbnail
                                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                        />
                                                        <p className="my-auto ms-2">{currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}</p>
                                                    </>
                                                ) : (
                                                    <LoadingSpinner />
                                                )}
                                            </div>
                                        }
                                    >
                                        <Link to={"/profile"} className="text-decoration-none px-3 py-5 text-black"><PersonOutlined className="me-3" />Profile</Link>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}><ExitToApp className="me-3" />Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}
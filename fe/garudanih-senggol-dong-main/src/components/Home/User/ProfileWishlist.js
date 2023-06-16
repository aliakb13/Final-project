import axios from "axios";
import moment from "moment";
import { Card, Col, Row, Button, Placeholder } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState, forwardRef, Fragment } from "react";
import LoadingSquare from '../../Loader/LoadingSquare'
import { Link } from "react-router-dom";

export default function ProfileWishlist() {
    const [wishlist, setWishlist] = useState(null)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

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
                setLoading(false)

                setWishlist(res.data.data.wishlist)

            }).catch((err) => {
                console.log(err.message)
            })
        }, 5000)

        return () => {
            clearInterval(interval)
        }

    }, [])

    const onDeleteHandler = (id) => {
        setLoading(true)

        const token = localStorage.getItem("token")

        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_LOCAL_URL}/v1/wishlist/${id}`,
            timeout: 120000,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(() => {
                setLoading(false)

                setOpen(true)

            })
            .catch((err) => console.log(err.response.data.errors))
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
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <>
            {loading ? (
                <div className="mt-5">
                    <LoadingSquare />
                </div>
            ) : (
                <Card className="my-4 border-0">
                    {open ? (
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            action={action}
                        >
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Success delete from wishlist
                            </Alert>
                        </Snackbar>
                    ) : ""}
                    <div>
                        {wishlist ? (
                            wishlist.map((item, index) => {
                                return (
                                    <Row key={index} className="user--wish--item">
                                        <Col md="5">
                                            <p className="fs-5">{item.detailTicket.departure}</p>
                                            <p className="fw-bold" style={{ color: "#2F82FF" }}>({item.detailTicket.departureCode})</p>
                                            <p>{moment(item.detailTicket.takeOff).format('LT')}</p>
                                        </Col>
                                        <Col md="4">
                                            <p className="fs-5">{item.detailTicket.destination}</p>
                                            <p className="fw-bold" style={{ color: "#2F82FF" }}>({item.detailTicket.destinationCode})</p>
                                            <p>{moment(item.detailTicket.arrive).format('LT')}</p>
                                        </Col>
                                        <Col md="3" className="align-self-center">
                                            <Link to={`/ticket/${item.ticketId}`} className="btn btn-primary w-100 mb-3">Detail ticket</Link>
                                            <Button variant="outline-dark" onClick={() => onDeleteHandler(item.id)} className="w-100">Remove from wishlist</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        ) : (
                            <Placeholder animation="glow" className="p-3">
                                <Placeholder xs={12} />
                            </Placeholder>
                        )}
                    </div>
                </Card>
            )}
        </>
    );
}
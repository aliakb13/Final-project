import axios from "axios";
import moment from "moment";
import { useEffect, useState, forwardRef, Fragment } from "react";
import { Button, Card, Col, Nav, Placeholder, Row, Tab } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

export default function ProfileNotification() {
    const [notification, setNotification] = useState([])
    const [read, setRead] = useState([])
    const [open, setOpen] = useState(false);

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
            }).then((res) => {
                setNotification(res.data.data.filter((item) => !item.isRead))

                const arr = res.data.data.filter((item) => item.isRead)

                setRead(arr)
            }).catch((err) => {
                console.log(err.message)
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
            .then(() => {
                setOpen(true)

            })
            .catch((err) => console.log(err))
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
        <Card className="my-4 border-0">
            {open ? (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Read notification success
                    </Alert>
                </Snackbar>
            ) : ""}
            <Card.Body>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className="d-flex justify-content-between">
                                        <span>Unread</span>
                                        <span>{notification.length}</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className="d-flex justify-content-between">
                                        <span>Read</span>
                                        <span>{read.length}</span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {notification.length !== 0 ? (
                                        notification.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item.isRead ? "" : (
                                                        <>
                                                            <Card.Body className="d-flex justify-content-between">
                                                                <div>
                                                                    <span>{item.desc}</span>
                                                                    <p className="my-0 text-muted">{moment(item.updatedAt).startOf('hour').fromNow()}</p>
                                                                </div>
                                                                <Button variant="outline-dark" onClick={() => onReadHandler(item.id)} className="align-self-center">Read</Button>
                                                            </Card.Body>
                                                            {index !== notification.length - 1 ? (
                                                                <hr className="my-0" />
                                                            ) : ""}
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <Placeholder animation="glow" className="p-3">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {read.length !== 0 ? (
                                        read.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <Card.Body>
                                                        <span>{item.desc}</span>
                                                        <p className="my-0 text-muted">{moment(item.updatedAt).fromNow()}</p>
                                                    </Card.Body>
                                                    {index !== read.length - 1 ? (
                                                        <hr className="my-0" />
                                                    ) : ""}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <Placeholder animation="glow" className="p-3">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    )}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
}
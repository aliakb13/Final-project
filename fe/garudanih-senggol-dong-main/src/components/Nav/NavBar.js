import "./nav.css"
import logo from '../../assets/logo.svg'
import LoadingSpinner from '../LoadingSpinner';
import { Link } from 'react-router-dom'
import { Image, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogout } from '../../actions/UserAction';
import React from "react"
import { ExitToApp, PersonOutlined } from "@mui/icons-material";

function Navigation() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUserData } = useSelector((state) => state.UserReducer)

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

    function handleLogout() {
        dispatch(actionUserLogout())
        navigate("/login")
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                {currentUserData ? (
                    <div style={{ display: "flex", cursor: "pointer" }}>
                        <Image
                            src={currentUserData.image || logo}
                            alt="user img"
                            roundedCircle
                            thumbnail
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <p className="my-auto ms-2 d-none d-md-block">{currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}</p>
                    </div>
                ) : (
                    <LoadingSpinner />
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Link to={"admin"} className="text-decoration-none px-3 py-5 text-black"><PersonOutlined className="me-3" />Profile</Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}><ExitToApp className="me-3" />Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Navigation
import moment from "moment";
import { AccessTime, Edit } from "@mui/icons-material";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import imgLogo from '../../../assets/logo.svg'
import { Link, useLocation } from "react-router-dom";

export default function ProfileHeading() {
    const currentPath = useLocation().pathname

    const { currentUserData } = useSelector((state) => state.UserReducer)

    return (
        <Card className="border-0">
            {currentUserData ? (
                <Row className="px-3 py-4">
                    <Col sm="12" md="4" className="d-flex align-items-center">
                        <Image
                            src={currentUserData.image || imgLogo}
                            alt="user img"
                            roundedCircle
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <div className="mx-4 my-auto">
                            <p className="fs-5 my-0">{currentUserData.name.charAt(0).toUpperCase() + currentUserData.name.slice(1)}</p>
                            <p className="mb-0">Member ID : #{currentUserData.id}</p>
                        </div>
                    </Col>
                    <Col sm="6" md="4" className="d-flex align-items-center text-muted">
                        <AccessTime />
                        <p className="mx-2 my-0">Last Updated :</p>
                        <p className="my-0 text-black">{moment(currentUserData.updatedAt).fromNow()}</p>
                    </Col>
                    <Col sm="6" md="4" className="d-flex justify-content-end align-items-center">
                        <Link to={"edit"} className="bg-black text-decoration-none text-white px-3 py-2 rounded">
                            <Edit />
                            <span className="ms-2">Edit Profile</span>
                        </Link>
                    </Col>
                </Row>
            ) : ""}
            <div className="nav--profile">
                <Link to={"/profile"} className={currentPath === "/profile" ? "active" : ""}>About</Link>
                <Link to={"notification"} className={currentPath === "/profile/notification" ? "active" : ""}>Notification</Link>
                <Link to={"wishlist"} className={currentPath === "/profile/wishlist" ? "active" : ""}>Wishlist</Link>
            </div>
        </Card>
    );
}
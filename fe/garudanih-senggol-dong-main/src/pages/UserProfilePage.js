import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ProfileHeading from "../components/Home/User/ProfileHeading";

export default function UserProfilePage() {
    return (
        <Container style={{ marginTop: "-10em" }}>
            <ProfileHeading />
            <Outlet />
        </Container>
    );
}
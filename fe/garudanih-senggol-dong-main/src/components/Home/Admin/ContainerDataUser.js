import FetchingDataUser from "./FetchingDataUser";
import { Link } from "react-router-dom";

export default function ContainerDataUser() {
    return (
        <div className="p-3">
            <div className="d-flex">
                <i className="bi bi-people-fill text-white px-2 py-1 rounded fs-4" style={{ background: "#2F82FF" }}></i>
                <p className="fs-4 fw-bold ms-2 my-auto">Our Users</p>
            </div>
            <div className="my-3">
                <FetchingDataUser />
            </div>
            <Link to={"create"} className="btn btn-primary">Create New User</Link>
        </div>
    );
}
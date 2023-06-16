import { PersonOutline } from '@mui/icons-material';
import ProfileEdit from '../User/ProfileEdit';

export default function EditProfile() {
    return (
        <div className="p-3">
            <div className="d-flex">
                <div className="text-white py-1 px-2 rounded fs-4 d-flex justify-content-center align-items-center" style={{ background: "#2F82FF", fontSize: "20px" }}>
                    <PersonOutline />
                </div>
                <p className="fs-4 fw-bold ms-2 my-auto">Profile</p>
            </div>
            <div>
                <ProfileEdit />
            </div>
        </div >
    );
}
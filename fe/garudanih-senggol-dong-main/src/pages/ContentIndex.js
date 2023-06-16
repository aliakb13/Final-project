import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import DashboardContent from '../components/Home/Admin/DashboardContent';
import DashboardUser from '../components/Home/User/DashboardUser';

export default function ContentIndex() {
    const { currentUserData } = useSelector((state) => state.UserReducer)

    return (
        <div>
            {currentUserData ? (
                currentUserData.role === "member" ? <DashboardUser /> : <DashboardContent />
            ) : (
                <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <LoadingSpinner />
                </div>
            )}
        </div >
    )
}
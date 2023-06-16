import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionCurrentUser } from '../actions/UserAction';
import HomeAdmin from '../components/Home/Admin/Home';
import UserPage from './UserPage';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LandingPage() {
    const dispatch = useDispatch()

    const token = localStorage.getItem("token")

    const { currentUserData } = useSelector((state) => state.UserReducer)

    useEffect(() => {

        dispatch(actionCurrentUser(token))

    }, [dispatch, token])

    return (
        <div>
            {currentUserData ? (
                currentUserData.role === "member" ? <UserPage /> : <HomeAdmin />
            ) : (
                <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                    <LoadingSpinner />
                </div>
            )}
        </div >
    )
}
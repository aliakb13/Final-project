import NavBar from '../../Nav/NavBar'
import SideBar from '../../Nav/SideBar'
import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function HomeAdmin() {
    const [isOpen, setIsOpen] = useState(false)

    const handleTrigger = () => setIsOpen(!isOpen)

    return (
        <div>
            <SideBar show={isOpen} />
            <div className={`content ${isOpen ? 'content-open' : ''}`}>
                <div className="d-flex justify-content-between bg-white p-3">
                    <div className="fs-2 my-auto" onClick={handleTrigger} style={{ cursor: "pointer" }}>
                        {isOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
                    </div>
                    <div className="d-flex">
                        <NavBar />
                    </div>
                </div>
                {/* Admin Components */}
                <Outlet />
            </div>
        </div>
    )
}
import "./nav.css"
import { Link } from 'react-router-dom'

export default function SideBar({ show }) {
    const listItem = [
        {
            item: "Dashboard",
            link: "../",
            icon: "bi bi-grid-1x2-fill ps-4",
        },
        {
            item: "Our Users",
            link: "user",
            icon: "bi bi-people-fill ps-4",
        },
        {
            item: "List Ticket",
            link: "ticket",
            icon: "bi bi-ticket-perforated-fill ps-4",
        },
        {
            item: "Transaction",
            link: "transaction",
            icon: "bi bi-receipt-cutoff ps-4",
        },
    ]

    return (
        <div className={`sidebar ${show ? 'sidebar--open' : ''}`}>
            <div className="sidebar-position icon mb-5">
                <i className="bi bi-airplane-fill fs-2 ms-3" style={{ rotate: "45deg", color: "#2F82FF" }}></i>
                <Link className="fs-4" style={{ color: "#2F82FF" }}>GarudaNih</Link>
            </div>
            {listItem.map((menu, index) => {
                return (
                    <div className="sidebar-position" key={index}>
                        <i className={menu.icon}></i>
                        <Link to={`admin/${menu.link}`}>{menu.item}</Link>
                    </div>
                )
            })}
        </div>
    );
}
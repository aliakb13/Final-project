import FetchingDataTransc from "./FetchingDataTransc";

export default function ContainerDataTicket() {
    return (
        <div className="p-3">
            <div className="d-flex">
                <i className="bi bi-receipt-cutoff text-white px-2 py-1 rounded fs-4" style={{ background: "#2F82FF" }}></i>
                <p className="fs-4 fw-bold ms-2 my-auto">Transaction All The Time</p>
            </div>
            <div className="my-3">
                <FetchingDataTransc />
            </div>
        </div>
    );
}
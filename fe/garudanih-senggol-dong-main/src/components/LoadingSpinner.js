import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
    return (
        <>
            <Spinner
                as="span"
                animation="border"
                role="status"
                size="sm"
                aria-hidden="true"
                className="me-3"
            />Loading...
        </>
    )
}

export default LoadingSpinner
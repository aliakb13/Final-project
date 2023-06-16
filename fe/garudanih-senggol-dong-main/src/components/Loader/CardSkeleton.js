import { Row, Col, Card } from "react-bootstrap";
import { Skeleton } from '@mui/material';

export default function CardSkeleton(props) {
    return (
        <Row>
            <Col md={props.md}>
                <Card className="w-100">
                    <Card.Body>
                        <Skeleton style={{ marginBottom: "15px" }} />
                        <Skeleton variant="rounded" height={100} style={{ marginBottom: "15px" }} />
                        <Skeleton height={30} style={{ marginBottom: "15px" }} />
                    </Card.Body>
                    <Card.Footer>
                        <Skeleton height={30} />
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
}
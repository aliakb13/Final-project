import { Card, Container } from 'react-bootstrap';
import FormFilter from '../components/Home/User/FormFilter'
import ResultFilter from '../components/Home/User/ResultFilter'

export default function UserTicketPage() {
    return (
        <>
            <Container className="mb-5">
                <b>Find your holiday destination</b>
                <Card className="my-4 border-0">
                    <Card.Body>
                        <FormFilter />
                    </Card.Body>
                </Card>
                <ResultFilter />
            </Container>
        </>
    );
}
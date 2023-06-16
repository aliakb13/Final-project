import './user.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSquare from '../../Loader/LoadingSquare';

export default function ResultFilter() {
    const { filteredTicketResult, filteredTicketLoading, flightTicketResult } = useSelector((state) => state.TicketReducer)

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <>
            {!filteredTicketLoading ? (
                filteredTicketResult ? (
                    <>
                        <b>Seacrhing result : {filteredTicketResult.length} ticket found</b>
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            responsive={responsive}
                            ssr={true}
                            keyBoardControl={true}
                            customTransition="all 1.5s ease-in-out"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            showDots={true}
                            itemClass="me-3"
                        >
                            {filteredTicketResult.map((ticket, index) => {
                                return (
                                    <div key={index} className="my-4 plan-card">
                                        <h2>{ticket.class}<span>{moment(ticket.takeOff).format('LL')}</span></h2>
                                        <div className="etiquet-price">
                                            <p className="text-truncate">{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                            <div></div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-muted mb-0">From</p>
                                            <p className="m-0 text-truncate">{ticket.departure.split(",")[1]}</p>
                                            <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                            <p>{moment(ticket.takeOff).format('LT')}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className="text-muted mb-0">To</p>
                                            <p className="m-0 text-truncate">{ticket.destination.split(",")[1]}</p>
                                            <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                            <p>{moment(ticket.arrive).format('LT')}</p>
                                        </div>
                                        <Link to={`${ticket.id}`} className="btn--cta">Check detail</Link>
                                    </div>
                                )
                            })}
                        </Carousel>
                    </>
                ) : (
                    flightTicketResult ? (
                        <>
                            <b>New Ticket</b>
                            <Carousel
                                swipeable={true}
                                draggable={false}
                                responsive={responsive}
                                ssr={true}
                                keyBoardControl={true}
                                customTransition="all 1.5s ease-in-out"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                showDots={true}
                                itemClass="me-3"
                            >
                                {flightTicketResult.map((ticket, index) => {
                                    return (
                                        <div key={index} className="my-4 plan-card">
                                            <h2>{ticket.class}<span>{moment(ticket.takeOff).format('LL')}</span></h2>
                                            <div className="etiquet-price">
                                                <p className="text-truncate">{ticket.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                                <div></div>
                                            </div>
                                            <div className="mt-3">
                                                <p className="text-muted mb-0">From</p>
                                                <p className="m-0 text-truncate">{ticket.departure.split(",")[1]}</p>
                                                <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.departureCode})</p>
                                                <p>{moment(ticket.takeOff).format('LT')}</p>
                                            </div>
                                            <div className="mb-5">
                                                <p className="text-muted mb-0">To</p>
                                                <p className="m-0 text-truncate">{ticket.destination.split(",")[1]}</p>
                                                <p className="fw-bold my-0" style={{ color: "#2F82FF" }}>({ticket.destinationCode})</p>
                                                <p>{moment(ticket.arrive).format('LT')}</p>
                                            </div>
                                            <Link to={`${ticket.id}`} className="btn--cta">Check detail</Link>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </>
                    ) : (
                        <div className="my-5">
                            <LoadingSquare />
                        </div>
                    )
                )
            ) : (
                <div className="my-5">
                    <LoadingSquare />
                </div>
            )}
        </>

    );
}
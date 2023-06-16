import { FILTERED_TICKET, FLIGHT_TICKET } from '../../actions/TicketAction'

export const initialState = {
    filteredTicketResult: false,
    filteredTicketLoading: false,
    filteredTicketError: false,

    flightTicketResult: false,
    flightTicketLoading: false,
    flightTicketError: false,
}

const tickets = (state = initialState, action) => {
    switch (action.type) {
        case FILTERED_TICKET:
            return {
                ...state,
                filteredTicketResult: action.payload.data,
                filteredTicketLoading: action.payload.loading,
                filteredTicketError: action.payload.errorMessage
            }
        case FLIGHT_TICKET:
            return {
                ...state,
                flightTicketResult: action.payload.data,
                flightTicketLoading: action.payload.loading,
                flightTicketError: action.payload.errorMessage
            }
        default:
            return state
    }
}

export default tickets;
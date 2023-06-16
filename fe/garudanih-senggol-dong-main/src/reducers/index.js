import { combineReducers } from "redux";
import UserReducer from './user'
import TicketReducer from './ticket'

export default combineReducers({
    UserReducer,
    TicketReducer,
})
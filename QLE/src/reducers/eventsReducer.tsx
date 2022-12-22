import { EVENTSActions, EVENTSState} from "../interfaces/types";
import {eventsTypes} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: EVENTSState = {
    pending: false,
    error: null,
    response: null,
    
   
};

export default (state = initialState, action: EVENTSActions) => {
    switch (action.type) {
        case eventsTypes.FETCH_EVENTS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case eventsTypes.FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                pending: false,
                response: action.payload,
                error: null
            };
        case eventsTypes.FETCH_EVENTS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEVENTSEnteredDetails = (state: RootState) => state.events;
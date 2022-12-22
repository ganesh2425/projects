import { EventStatusActions, EventStatus } from '../../interfaces/types';
import {eventStatusTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EventStatus = {
    pending: false,
    error: null,
    data: [],
};

export default (state = initialState, action: EventStatusActions) => {
    switch (action.type) {
        case eventStatusTypes.FETCH_EVENT_STATUS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case eventStatusTypes.FETCH_EVENT_STATUS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case eventStatusTypes.FETCH_EVENT_STATUS_FAILURE:
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
export const getEventStatusDetails = (state: RootState) => state.eventStatus.data;
import { SentStatusMailActions, SentStatusMailState} from "../../interfaces/types";
import { sentStatusMailTypes } from '../../constants/actionTypes';
import {RootState} from "../index";

const initialState: SentStatusMailState = {
    pending: false,
    error: null,
    response: null,
    length: 0,
    data: {},
    eventId: "",
    eventStatus: "",
    emailSubject: "",
    emailContent: ""
};

export default (state =initialState, action: SentStatusMailActions) => {
    switch (action.type) {
        case sentStatusMailTypes.FETCH_SENTSTATUSMAIL_REQUEST:
            return {
                ...state,
                pending: true
            };
        case sentStatusMailTypes.FETCH_SENTSTATUSMAIL_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case sentStatusMailTypes.FETCH_SENTSTATUSMAIL_FAILURE:
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
export const getSentStatusMailDetails = (state: RootState) => state.sentStatusMail.data;
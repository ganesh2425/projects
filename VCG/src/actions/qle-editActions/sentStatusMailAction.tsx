import { sentStatusMailTypes } from "../../constants/actionTypes";
import {
    FetchSentStatusMailFailure,
    FetchPostsFailurePayload,
    FetchSentStatusMailRequest,
    FetchSentStatusMailSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchSentStatusMailRequest = (payload: any): FetchSentStatusMailRequest => ({
    type: sentStatusMailTypes.FETCH_SENTSTATUSMAIL_REQUEST,
    payload
});

export const fetchSentStatusMailSuccess = (
    payload: any
): FetchSentStatusMailSuccess => ({
    type:sentStatusMailTypes.FETCH_SENTSTATUSMAIL_SUCCESS,
    payload
});

export const fetchSentStatusMailFailure = (
    payload: FetchPostsFailurePayload
): FetchSentStatusMailFailure => ({
    type: sentStatusMailTypes.FETCH_SENTSTATUSMAIL_FAILURE,
    payload
});

export const setSentStatusMailAction = (payload: any, history: any) => ({
    type: sentStatusMailTypes.SENTSTATUSMAIL__INFO,
    payload,
    history
});


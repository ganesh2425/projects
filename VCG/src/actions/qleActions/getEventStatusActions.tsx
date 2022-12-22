import { eventStatusTypes } from "../../constants/actionTypes";
import {
    FetchEventStatusFailure,
    FetchPostsFailurePayload,
    FetchEventStatusRequest,
    FetchEventStatusSuccess,
    FetchEventStatusSuccessPayload,
} from "../../interfaces/types";

export const fetchEventStatusRequest = (payload: any): FetchEventStatusRequest => ({
    type: eventStatusTypes.FETCH_EVENT_STATUS_REQUEST,
    payload
});

export const fetchEventStatusSuccess = (
    payload: FetchEventStatusSuccessPayload
): FetchEventStatusSuccess => ({
    type: eventStatusTypes.FETCH_EVENT_STATUS_SUCCESS,
    payload
});

export const fetchEventStatusFailure = (
    payload: FetchPostsFailurePayload
): FetchEventStatusFailure => ({
    type: eventStatusTypes.FETCH_EVENT_STATUS_FAILURE,
    payload
});



import { delQleEventTypes } from "../../constants/actionTypes";
import {
    FetchDelQleEventFailure,
    FetchPostsFailurePayload,
    FetchDelQleEventRequest,
    FetchDelQleEventSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchDelQleEventRequest = (payload: any): FetchDelQleEventRequest => ({
    type: delQleEventTypes.FETCH_DELQLEEVENT_REQUEST,
    payload
});

export const fetchDelQleEventSuccess = (
    payload: any
): FetchDelQleEventSuccess => ({
    type: delQleEventTypes.FETCH_DELQLEEVENT_SUCCESS,
    payload
});

export const fetchDelQleEventFailure = (
    payload: FetchPostsFailurePayload
): FetchDelQleEventFailure => ({
    type: delQleEventTypes.FETCH_DELQLEEVENT_FAILURE,
    payload
});

export const setDelQleEventAction = (payload: any, history: any) => ({
    type: delQleEventTypes.DELQLEEVENT_INFO,
    payload,
    history
});


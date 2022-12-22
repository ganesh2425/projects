import { eventsTypes } from "../constants/actionTypes";
import {
    FetchEVENTSFailure,
    FetchPostsFailurePayload,
    FetchEVENTSRequest,
    FetchEVENTSSuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchEVENTSRequest = (payload: any): FetchEVENTSRequest => ({
    type: eventsTypes.FETCH_EVENTS_REQUEST,
    payload
});

export const fetchEVENTSSuccess = (
    payload: any
): FetchEVENTSSuccess => ({
    type: eventsTypes.FETCH_EVENTS_SUCCESS,
    payload
});

export const fetchEVENTSFailure = (
    payload: FetchPostsFailurePayload
): FetchEVENTSFailure => ({
    type: eventsTypes.FETCH_EVENTS_FAILURE,
    payload
});

export const setEVENTSAction = (payload: any, history: any) => ({
    type: eventsTypes.EVENTS_INFO,
    payload,
    history
});

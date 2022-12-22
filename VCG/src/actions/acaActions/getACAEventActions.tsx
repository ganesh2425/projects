
import { getACAEventTypes } from "../../constants/actionTypes";
import {
    FetchGetACAEventFailure,
    FetchPostsFailurePayload,
    FetchGetACAEventRequest,
    FetchGetACAEventSuccess,
    GetEmployerResponse,
    FetchGetACAEventSuccessPayload,
} from "../../interfaces/types";

export const fetchGetACAEventRequest = (payload: any): FetchGetACAEventRequest => ({
    type: getACAEventTypes.FETCH_GETACAEVENT_REQUEST,
    payload
});

export const fetchGetACAEventSuccess = (
    payload: any
): FetchGetACAEventSuccess => ({
    type: getACAEventTypes.FETCH_GETACAEVENT_SUCCESS,
    payload
});

export const fetchGetACAEventFailure = (
    payload: FetchPostsFailurePayload
): FetchGetACAEventFailure => ({
    type: getACAEventTypes.FETCH_GETACAEVENT_FAILURE,
    payload
});



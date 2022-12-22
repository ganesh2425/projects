import { delACAEventTypes } from "../../constants/actionTypes";
import {
    FetchDelACAEventFailure,
    FetchPostsFailurePayload,
    FetchDelACAEventRequest,
    FetchDelACAEventSuccess,
    DelResponse, 
} from "../../interfaces/types";

export const fetchDelACAEventRequest = (payload: any): FetchDelACAEventRequest => ({
    type: delACAEventTypes.FETCH_DELACAEVENT_REQUEST,
    payload
});

export const fetchDelACAEventSuccess = (
    payload: DelResponse
): FetchDelACAEventSuccess => ({
    type: delACAEventTypes.FETCH_DELACAEVENT_SUCCESS,
    payload
});

export const fetchDelACAEventFailure = (
    payload: FetchPostsFailurePayload
): FetchDelACAEventFailure => ({
    type: delACAEventTypes.FETCH_DELACAEVENT_FAILURE,
    payload
});
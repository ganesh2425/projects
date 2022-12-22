import { statesTypes } from "../../constants/actionTypes";
import {
    FetchSTATESFailure,
    FetchPostsFailurePayload,
    FetchSTATESRequest,
    FetchSTATESSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchSTATESRequest = (payload: any): FetchSTATESRequest => ({
    type: statesTypes.FETCH_STATES_REQUEST,
    payload
});

export const fetchSTATESSuccess = (
    payload: any
): FetchSTATESSuccess => ({
    type: statesTypes.FETCH_STATES_SUCCESS,
    payload
});

export const fetchSTATESFailure = (
    payload: FetchPostsFailurePayload
): FetchSTATESFailure => ({
    type: statesTypes.FETCH_STATES_FAILURE,
    payload
});

export const setSTATESAction = (payload: any, history: any) => ({
    type: statesTypes.STATES_INFO,
    payload,
    history
});

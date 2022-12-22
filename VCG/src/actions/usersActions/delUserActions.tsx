import { delUserTypes } from "../../constants/actionTypes";
import {
    FetchDelUserFailure,
    FetchPostsFailurePayload,
    FetchDelUserRequest,
    FetchDelUserSuccess,
    DelResponse
} from "../../interfaces/types";

export const fetchDelUserRequest = (payload: any): FetchDelUserRequest => ({
    type: delUserTypes.FETCH_DELUSER_REQUEST,
    payload
});

export const fetchDelUserSuccess = (
    payload: DelResponse
): FetchDelUserSuccess => ({
    type: delUserTypes.FETCH_DELUSER_SUCCESS,
    payload
});

export const fetchDelUserFailure = (
    payload: FetchPostsFailurePayload
): FetchDelUserFailure => ({
    type: delUserTypes.FETCH_DELUSER_FAILURE,
    payload
});



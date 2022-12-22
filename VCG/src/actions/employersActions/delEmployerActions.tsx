import { delEmployerTypes } from "../../constants/actionTypes";
import {
    FetchDelEmployerFailure,
    FetchPostsFailurePayload,
    FetchDelEmployerRequest,
    FetchDelEmployerSuccess,
    DelResponse
} from "../../interfaces/types";

export const fetchDelEmployerRequest = (payload: any): FetchDelEmployerRequest => ({
    type: delEmployerTypes.FETCH_DELEMPLOYER_REQUEST,
    payload
});

export const fetchDelEmployerSuccess = (
    payload: DelResponse
): FetchDelEmployerSuccess => ({
    type: delEmployerTypes.FETCH_DELEMPLOYER_SUCCESS,
    payload
});

export const fetchDelEmployerFailure = (
    payload: FetchPostsFailurePayload
): FetchDelEmployerFailure => ({
    type: delEmployerTypes.FETCH_DELEMPLOYER_FAILURE,
    payload
});



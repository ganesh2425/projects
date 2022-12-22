import { step2CancelTypes } from "../constants/actionTypes";
import {
    FetchSTEP2CancelFailure,
    FetchPostsFailurePayload,
    FetchSTEP2CancelRequest,
    FetchSTEP2CancelSuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchSTEP2CancelRequest = (payload: any): FetchSTEP2CancelRequest => ({
    type: step2CancelTypes.FETCH_STEP2CANCEL_REQUEST,
    payload
});

export const fetchSTEP2CancelSuccess = (
    payload: any
): FetchSTEP2CancelSuccess => ({
    type: step2CancelTypes.FETCH_STEP2CANCEL_SUCCESS,
    payload
});

export const fetchSTEP2CancelFailure = (
    payload: FetchPostsFailurePayload
): FetchSTEP2CancelFailure => ({
    type: step2CancelTypes.FETCH_STEP2CANCEL_FAILURE,
    payload
});

export const setSTEP2CancelAction = (payload: any, history: any) => ({
    type: step2CancelTypes.STEP2CANCEL_INFO,
    payload,
    history
});

import { step2Types } from "../constants/actionTypes";
import {
    FetchSTEP2Failure,
    FetchPostsFailurePayload,
    FetchSTEP2Request,
    FetchSTEP2Success,
     AuthResponse
} from "../interfaces/types";

export const fetchSTEP2Request = (payload: any): FetchSTEP2Request => ({
    type: step2Types.FETCH_STEP2_REQUEST,
    payload
});

export const fetchSTEP2Success = (
    payload: any
): FetchSTEP2Success => ({
    type: step2Types.FETCH_STEP2_SUCCESS,
    payload
});

export const fetchSTEP2Failure = (
    payload: FetchPostsFailurePayload
): FetchSTEP2Failure => ({
    type: step2Types.FETCH_STEP2_FAILURE,
    payload
});

export const setSTEP2Action = (payload: any, history: any) => ({
    type: step2Types.STEP2_INFO,
    payload,
    history
});

import { step3Types } from "../constants/actionTypes";
import {
    FetchSTEP3Failure,
    FetchPostsFailurePayload,
    FetchSTEP3Request,
    FetchSTEP3Success,
    FetchSTEP3SuccessPayload,
     AuthResponse
} from "../interfaces/types";

export const fetchSTEP3Request = (payload: any): FetchSTEP3Request => ({
    type: step3Types.FETCH_STEP3_REQUEST,
    payload
});

export const fetchSTEP3Success = (
    payload: FetchSTEP3SuccessPayload
): FetchSTEP3Success => ({
    type: step3Types.FETCH_STEP3_SUCCESS,
    payload
});

export const fetchSTEP3Failure = (
    payload: FetchPostsFailurePayload
): FetchSTEP3Failure => ({
    type: step3Types.FETCH_STEP3_FAILURE,
    payload
});

export const setSTEP3Action = (payload: any, history: any) => ({
    type: step3Types.STEP3_INFO,
    payload,
    history
});

import { step1Types } from "../constants/actionTypes";
import {
    FetchSTEP1Failure,
    FetchPostsFailurePayload,
    FetchSTEP1Request,
    FetchSTEP1Success,
     AuthResponse
} from "../interfaces/types";

export const fetchSTEP1Request = (payload: any): FetchSTEP1Request => ({
    type: step1Types.FETCH_STEP1_REQUEST,
    payload
});

export const fetchSTEP1Success = (
    payload: any
): FetchSTEP1Success => ({
    type: step1Types.FETCH_STEP1_SUCCESS,
    payload
});

export const fetchSTEP1Failure = (
    payload: FetchPostsFailurePayload
): FetchSTEP1Failure => ({
    type: step1Types.FETCH_STEP1_FAILURE,
    payload
});

export const setSTEP1Action = (payload: any, history: any) => ({
    type: step1Types.STEP1_INFO,
    payload,
    history
});

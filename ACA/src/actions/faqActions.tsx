import { faqTypes } from "../constants/actionTypes";
import {
    FetchFAQFailure,
    FetchPostsFailurePayload,
    FetchFAQRequest,
    FetchFAQSuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchFAQRequest = (payload: any): FetchFAQRequest => ({
    type: faqTypes.FETCH_FAQ_REQUEST,
    payload
});

export const fetchFAQSuccess = (
    payload: any
): FetchFAQSuccess => ({
    type: faqTypes.FETCH_FAQ_SUCCESS,
    payload
});

export const fetchFAQFailure = (
    payload: FetchPostsFailurePayload
): FetchFAQFailure => ({
    type: faqTypes.FETCH_FAQ_FAILURE,
    payload
});

export const setFAQAction = (payload: any, history: any) => ({
    type: faqTypes.FAQ_INFO,
    payload,
    history
});

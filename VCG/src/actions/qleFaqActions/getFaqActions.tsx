import { getFaqTypes } from "../../constants/actionTypes";
import {
    FetchGetFaqFailure,
    FetchPostsFailurePayload,
    FetchGetFaqRequest,
    FetchGetFaqSuccess,
    GetFaqResponse,
    FetchGetFaqSuccessPayload,
} from "../../interfaces/qleFaqType";

export const fetchGetFaqRequest = (payload: any): FetchGetFaqRequest => ({
    type: getFaqTypes.FETCH_GETFAQ_REQUEST,
    payload
});

export const fetchGetFaqSuccess = (
    payload: any
): FetchGetFaqSuccess => ({
    type: getFaqTypes.FETCH_GETFAQ_SUCCESS,
    payload
});

export const fetchGetFaqFailure = (
    payload: FetchPostsFailurePayload
): FetchGetFaqFailure => ({
    type: getFaqTypes.FETCH_GETFAQ_FAILURE,
    payload
});



import { delFaqTypes } from "../../constants/actionTypes";
import {
    FetchDelFaqFailure,
    FetchPostsFailurePayload,
    FetchDelFaqRequest,
    FetchDelFaqSuccess,
    DelResponse
} from "../../interfaces/qleFaqType";

export const fetchDelFaqRequest = (payload: any): FetchDelFaqRequest => ({
    type: delFaqTypes.FETCH_DELFAQ_REQUEST,
    payload
});

export const fetchDelFaqSuccess = (
    payload: DelResponse
): FetchDelFaqSuccess => ({
    type: delFaqTypes.FETCH_DELFAQ_SUCCESS,
    payload
});

export const fetchDelFaqFailure = (
    payload: FetchPostsFailurePayload
): FetchDelFaqFailure => ({
    type: delFaqTypes.FETCH_DELFAQ_FAILURE,
    payload
});



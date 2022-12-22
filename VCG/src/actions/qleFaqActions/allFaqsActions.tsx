import { allQleFaqsTypes } from "../../constants/actionTypes";
import {
    FetchAllQleFaqsFailure,
    FetchPostsFailurePayload,
    FetchAllQleFaqsRequest,
    FetchAllQleFaqsSuccess,
    FetchAllQleFaqsSuccessPayload,
} from "../../interfaces/qleFaqType";

export const fetchAllQleFaqsRequest = (payload: any): FetchAllQleFaqsRequest => ({
    type: allQleFaqsTypes.FETCH_ALLQLEFAQS_REQUEST,
    payload
});

export const fetchAllQleFaqsSuccess = (
    payload: FetchAllQleFaqsSuccessPayload
): FetchAllQleFaqsSuccess => ({
    type: allQleFaqsTypes.FETCH_ALLQLEFAQS_SUCCESS,
    payload
});

export const fetchAllQleFaqsFailure = (
    payload: FetchPostsFailurePayload
): FetchAllQleFaqsFailure => ({
    type: allQleFaqsTypes.FETCH_ALLQLEFAQS_FAILURE,
    payload
});



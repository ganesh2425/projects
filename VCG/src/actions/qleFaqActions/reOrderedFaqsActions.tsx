import { allReOrderedFaqsTypes } from "../../constants/actionTypes";
import {
    FetchAllReOrderedFaqsFailure,
    FetchPostsFailurePayload,
    FetchAllReOrderedFaqsRequest,
    FetchAllReOrderedFaqsSuccess,
    FetchAllQleFaqsByEmpSuccessPayload,
} from "../../interfaces/qleFaqType";

export const fetchAllReOrderedFaqsRequest = (payload: any): FetchAllReOrderedFaqsRequest => ({
    type: allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_REQUEST,
    payload
});

export const fetchAllReOrderedFaqsSuccess = (
    payload: FetchAllQleFaqsByEmpSuccessPayload
): FetchAllReOrderedFaqsSuccess => ({
    type: allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_SUCCESS,
    payload
});

export const fetchAllReOrderedFaqsFailure = (
    payload: FetchPostsFailurePayload
): FetchAllReOrderedFaqsFailure => ({
    type: allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_FAILURE,
    payload
});



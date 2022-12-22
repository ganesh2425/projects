import { allqlesTypes } from "../../constants/actionTypes";
import {
    FetchAllQlesFailure,
    FetchPostsFailurePayload,
    FetchAllQlesRequest,
    FetchAllQlesSuccess,
    FetchAllQlesSuccessPayload,
} from "../../interfaces/types";

export const fetchAllQlesRequest = (payload: any): FetchAllQlesRequest => ({
    type: allqlesTypes.FETCH_ALLQLES_REQUEST,
    payload
});

export const fetchAllQlesSuccess = (
    payload: FetchAllQlesSuccessPayload
): FetchAllQlesSuccess => ({
    type: allqlesTypes.FETCH_ALLQLES_SUCCESS,
    payload
});

export const fetchAllQlesFailure = (
    payload: FetchPostsFailurePayload
): FetchAllQlesFailure => ({
    type: allqlesTypes.FETCH_ALLQLES_FAILURE,
    payload
});



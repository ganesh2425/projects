import { allEmployersTypes } from "../../constants/actionTypes";
import {
    FetchAllEmployersFailure,
    FetchPostsFailurePayload,
    FetchAllEmployersRequest,
    FetchAllEmployersSuccess,
    FetchAllEmployersSuccessPayload,
} from "../../interfaces/types";

export const fetchAllEmployersRequest = (payload: any): FetchAllEmployersRequest => ({
    type: allEmployersTypes.FETCH_ALLEMPLOYERS_REQUEST,
    payload
});

export const fetchAllEmployersSuccess = (
    payload: FetchAllEmployersSuccessPayload
): FetchAllEmployersSuccess => ({
    type: allEmployersTypes.FETCH_ALLEMPLOYERS_SUCCESS,
    payload
});

export const fetchAllEmployersFailure = (
    payload: FetchPostsFailurePayload
): FetchAllEmployersFailure => ({
    type: allEmployersTypes.FETCH_ALLEMPLOYERS_FAILURE,
    payload
});



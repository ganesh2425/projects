import { addACATypes } from "../constants/actionTypes";
import { FetchAddACAFailure, FetchPostsFailurePayload, FetchAddACARequest, FetchAddACASuccess, FetchAddACASuccessPayload } from "../interfaces/types";

export const fetchAddACARequest = (payload: any): FetchAddACARequest => ({
    type: addACATypes.FETCH_ACA_REQUEST,
    payload
});

export const fetchAddACASuccess = (
    payload: FetchAddACASuccessPayload
): FetchAddACASuccess => ({
    type: addACATypes.FETCH_ACA_SUCCESS,
    payload
});

export const fetchAddACAFailure = (
    payload: FetchPostsFailurePayload
): FetchAddACAFailure => ({
    type: addACATypes.FETCH_ACA_FAILURE,
    payload
});
import {allACATypes} from "../../constants/actionTypes";
import {FetchAllACAFailure, 
    FetchAllACASuccess, 
    FetchAllACASuccessPayload, 
    FetchAllACARequest,
    FetchPostsFailurePayload} from "../../interfaces/types";

export const fetchAllACARequest =(payload: any): FetchAllACARequest => ({
    type: allACATypes.FETCH_ALLACA_REQUEST,
    payload
});

export const fetchAllACASuccess = (
    payload: FetchAllACASuccessPayload
): FetchAllACASuccess => ({
    type: allACATypes.FETCH_ALLACA_SUCCESS,
    payload
});

export const fetchAllACAFailure = (
    payload: FetchPostsFailurePayload
): FetchAllACAFailure => ({
    type: allACATypes.FETCH_ALLACA_FAILURE,
    payload
});
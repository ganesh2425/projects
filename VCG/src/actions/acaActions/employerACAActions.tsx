import { employerACATypes } from "../../constants/actionTypes";
import {
    FetchEmployerACARequest,
    FetchEmployerACASuccess,
    FetchEmployerACASuccessPayload,
    FetchEmployerACAFailure,
    FetchPostsFailurePayload,
} from "../../interfaces/types";

export const fetchEmployerACARequest =(payload: any): FetchEmployerACARequest =>({
    type: employerACATypes.FETCH_EMPLOYERACA_REQUEST,
    payload
});

export const fetchEmployerACASuccess = (
    payload: any
): FetchEmployerACASuccess => ({
    type: employerACATypes.FETCH_EMPLOYERACA_SUCCESS,
    payload
});

export const fetchEmployerACAFailure = (
    payload: FetchPostsFailurePayload
): FetchEmployerACAFailure => ({
    type: employerACATypes.FETCH_EMPLOYERACA_FAILURE,
    payload
})

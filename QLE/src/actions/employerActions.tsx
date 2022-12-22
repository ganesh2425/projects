import { employerTypes } from "../constants/actionTypes";
import {
    FetchEmployerFailure,
    FetchPostsFailurePayload,
    FetchEmployerRequest,
    FetchEmployerSuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchEmployerRequest = (payload: any): FetchEmployerRequest => ({
    type: employerTypes.FETCH_EMPLOYER_REQUEST,
    payload
});

export const fetchEmployerSuccess = (
    payload: any
): FetchEmployerSuccess => ({
    type: employerTypes.FETCH_EMPLOYER_SUCCESS,
    payload
});

export const fetchEmployerFailure = (
    payload: FetchPostsFailurePayload
): FetchEmployerFailure => ({
    type: employerTypes.FETCH_EMPLOYER_FAILURE,
    payload
});

export const setEmployerAction = (payload: any, history: any) => ({
    type: employerTypes.EMPLOYER_INFO,
    payload,
    history
});

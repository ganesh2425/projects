
import { getEmployerTypes } from "../../constants/actionTypes";
import {
    FetchGetEmployerFailure,
    FetchPostsFailurePayload,
    FetchGetEmployerRequest,
    FetchGetEmployerSuccess,
    GetEmployerResponse,
    FetchGetEmployerSuccessPayload,
} from "../../interfaces/types";

export const fetchGetEmployerRequest = (payload: any): FetchGetEmployerRequest => ({
    type: getEmployerTypes.FETCH_GETEMPLOYER_REQUEST,
    payload
});

export const fetchGetEmployerSuccess = (
    payload: any
): FetchGetEmployerSuccess => ({
    type: getEmployerTypes.FETCH_GETEMPLOYER_SUCCESS,
    payload
});

export const fetchGetEmployerFailure = (
    payload: FetchPostsFailurePayload
): FetchGetEmployerFailure => ({
    type: getEmployerTypes.FETCH_GETEMPLOYER_FAILURE,
    payload
});



import { allActiveEmployersTypes } from "../../constants/actionTypes";
import {
    FetchAllEmployersByTypeFailure,
    FetchPostsFailurePayload,
    FetchAllEmployersByTypeRequest,
    FetchAllEmployersByTypeSuccess,
    FetchAllEmployersByTypeSuccessPayload,
} from "../../interfaces/types";

export const fetchAllEmployersByTypeRequest = (payload: any): FetchAllEmployersByTypeRequest => ({
    type: allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_REQUEST,
    payload
});

export const fetchAllEmployersByTypeSuccess = (
    payload: FetchAllEmployersByTypeSuccessPayload
): FetchAllEmployersByTypeSuccess => ({
    type: allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_SUCCESS,
    payload
});

export const fetchAllEmployersByTypeFailure = (
    payload: FetchPostsFailurePayload
): FetchAllEmployersByTypeFailure => ({
    type: allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_FAILURE,
    payload
});



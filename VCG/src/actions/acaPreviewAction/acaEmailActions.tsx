import { getACAEmailTypes } from "../../constants/actionTypes";
import {
    FetchGetACAEmailFailure,
    FetchPostsFailurePayload,
    FetchGetACAEmailRequest,
    FetchGetACAEmailSuccess,
    // GetACAEmailResponse,
    // FetchACAEmailSuccessPayload,
} from "../../interfaces/types";

export const fetchGetACAEmailRequest = (payload: any): FetchGetACAEmailRequest => ({
    type: getACAEmailTypes.FETCH_GET_ACA_EMAIL_REQUEST,
    payload
});

export const fetchGetACAEmailSuccess = (
    payload: any
): FetchGetACAEmailSuccess => ({
    type: getACAEmailTypes.FETCH_GET_ACA_EMAIL_SUCCESS,
    payload
});

export const fetchGetACAEmailFailure = (
    payload: FetchPostsFailurePayload
): FetchGetACAEmailFailure => ({
    type: getACAEmailTypes.FETCH_GET_ACA_EMAIL_FAILURE,
    payload
});



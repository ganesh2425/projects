import { logOutTypes } from "../../constants/actionTypes";
import {
    FetchLogoutFailure,
    FetchPostsFailurePayload,
    FetchLogoutRequest,
    FetchLogoutSuccess,
    AuthResponse, AddEmployer,
    FetchLogoutSuccessPayload,
} from "../../interfaces/types";

export const fetchLogoutRequest = (payload: any): FetchLogoutRequest => ({
    type: logOutTypes.FETCH_LOGOUT_REQUEST,
    payload
});

export const fetchLogoutSuccess = (
    payload: FetchLogoutSuccessPayload
): FetchLogoutSuccess => ({
    type: logOutTypes.FETCH_LOGOUT_SUCCESS,
    payload
});

export const fetchLogoutFailure = (
    payload: FetchPostsFailurePayload
): FetchLogoutFailure => ({
    type: logOutTypes.FETCH_LOGOUT_FAILURE,
    payload
});



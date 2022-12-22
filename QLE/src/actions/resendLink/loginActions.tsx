import { reLoginTypes } from "../../constants/actionTypes";
import {
    FetchreLoginFailure,
    FetchPostsFailurePayload,
    FetchreLoginRequest,
    FetchreLoginSuccess,
    reLogin, reAuthResponse
} from "../../interfaces/types";

export const fetchreLoginRequest = (payload: reLogin): FetchreLoginRequest => ({
    type: reLoginTypes.FETCH_RELOGIN_REQUEST,
    payload
});

export const fetchreLoginSuccess = (
    payload: reAuthResponse
): FetchreLoginSuccess => ({
    type: reLoginTypes.FETCH_RELOGIN_SUCCESS,
    payload
});

export const fetchreLoginFailure = (
    payload: FetchPostsFailurePayload
): FetchreLoginFailure => ({
    type: reLoginTypes.FETCH_RELOGIN_FAILURE,
    payload
});

export const setreLoggedAction = (payload: any, history: any) => ({
    type: reLoginTypes.RELOGGED_INFO,
    payload,
    history
});

import { forgotPwdTypes } from "../constants/actionTypes";
import {
    FetchForgotPwdFailure,
    FetchPostsFailurePayload,
    FetchForgotPwdRequest,
    FetchForgotPwdSuccess,
    ForgotPwd, ForgotPwdResponse
} from "../interfaces/types";

export const fetchForgotPwdRequest = (payload: ForgotPwd): FetchForgotPwdRequest => ({
    type: forgotPwdTypes.FETCH_FORGOTPWD_REQUEST,
    payload
});

export const fetchForgotPwdSuccess = (
    payload: ForgotPwdResponse
): FetchForgotPwdSuccess => ({
    type: forgotPwdTypes.FETCH_FORGOTPWD_SUCCESS,
    payload
});

export const fetchForgotPwdFailure = (
    payload: FetchPostsFailurePayload
): FetchForgotPwdFailure => ({
    type: forgotPwdTypes.FETCH_FORGOTPWD_FAILURE,
    payload
});

export const setForgotPwdAction = (payload: any, history: any) => ({
    type: forgotPwdTypes.FORGOTPWD_INFO,
    payload,
    
});

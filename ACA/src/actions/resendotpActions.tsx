import { resendOTPTypes } from "../constants/actionTypes";
import {
    FetchResendOTPFailure,
    FetchPostsFailurePayload,
    FetchResendOTPRequest,
    FetchResendOTPSuccess,
    OTP, AuthResponse
} from "../interfaces/types";

export const fetchResendOTPRequest = (payload: any): FetchResendOTPRequest => ({
    type: resendOTPTypes.FETCH_RESEND_OTP_REQUEST,
    payload
});

export const fetchResendOTPSuccess = (
    payload: any
): FetchResendOTPSuccess => ({
    type: resendOTPTypes.FETCH_RESEND_OTP_SUCCESS,
    payload
});

export const fetchResendOTPFailure = (
    payload: FetchPostsFailurePayload
): FetchResendOTPFailure => ({
    type: resendOTPTypes.FETCH_RESEND_OTP_FAILURE,
    payload
});

export const setResendOTPAction = (payload: any, history: any) => ({
    type: resendOTPTypes.RESEND_OTP_INFO,
    payload,
    history
});

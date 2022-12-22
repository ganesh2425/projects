import { otpTypes } from "../constants/actionTypes";
import {
    FetchOTPFailure,
    FetchPostsFailurePayload,
    FetchOTPRequest,
    FetchOTPSuccess,
    OTP, AuthResponse
} from "../interfaces/types";

export const fetchOTPRequest = (payload: any): FetchOTPRequest => ({
    type: otpTypes.FETCH_OTP_REQUEST,
    payload
});

export const fetchOTPSuccess = (
    payload: any
): FetchOTPSuccess => ({
    type: otpTypes.FETCH_OTP_SUCCESS,
    payload
});

export const fetchOTPFailure = (
    payload: FetchPostsFailurePayload
): FetchOTPFailure => ({
    type: otpTypes.FETCH_OTP_FAILURE,
    payload
});

export const setOTPAction = (payload: any, history: any) => ({
    type: otpTypes.OTP_INFO,
    payload,
    history
});

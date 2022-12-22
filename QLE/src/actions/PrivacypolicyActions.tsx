import { PrivacypolicyTypes } from "../constants/actionTypes";
import {
    FetchPrivacypolicyFailure,
    FetchPostsFailurePayload,
    FetchPRIVACYPOLICYRequest,
    FetchPrivacypolicySuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchPrivacypolicyRequest = (payload: any): FetchPRIVACYPOLICYRequest => ({
    type: PrivacypolicyTypes.FETCH_PRIVACYPOLICY_REQUEST,
    payload
});

export const fetchPrivacypolicySuccess = (
    payload: any
): FetchPrivacypolicySuccess => ({
    type: PrivacypolicyTypes.FETCH_PRIVACYPOLICY_SUCCESS,
    payload
});

export const fetchPrivacypolicyFailure = (
    payload: FetchPostsFailurePayload
): FetchPrivacypolicyFailure => ({
    type: PrivacypolicyTypes.FETCH_PRIVACYPOLICY_FAILURE,
    payload
});

export const setPrivacypolicyAction = (payload: any, history: any) => ({
    type: PrivacypolicyTypes.PRIVACYPOLICY_INFO,
    payload,
    history
});

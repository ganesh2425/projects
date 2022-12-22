import { homeTypes, privacyTypes } from "../constants/actionTypes";
import {
    FetchPRIVACYRequest,
    FetchPostsFailurePayload,
    FetchPRIVACYSuccess,
    FetchPRIVACYFailure,
} from "../interfaces/types";

export const fetchPRIVACYRequest =(payload: any): FetchPRIVACYRequest =>({
    type: privacyTypes.FETCH_PRIVACY_REQUEST,
    payload
});

export const fetchPRIVACYSuccess =(
    payload: any
): FetchPRIVACYSuccess => ({
    type: privacyTypes.FETCH_PRIVACY_SUCCESS,
    payload
});

export const fetchPRIVACYFailure =(
    payload: FetchPostsFailurePayload
): FetchPRIVACYFailure => ({
    type: privacyTypes.FETCH_PRIVACY_FAILURE,
    payload
})

export const setPRIVACYAction =(payload: any, history: any) => ({
    type: privacyTypes.PRIVACY_INFO,
    payload,
    history
});
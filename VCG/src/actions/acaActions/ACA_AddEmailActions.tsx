import { addEmailTypes } from "../../constants/actionTypes";
import {
    FetchAddEmailFailure,
    FetchPostsFailurePayload,
    FetchAddEmailRequest,
    FetchAddEmailSuccess,
    AddEmail, AuthResponse,
    FetchAddEmailSuccessPayload,
} from "../../interfaces/types";

export const fetchAddEmailRequest = (payload: AddEmail): FetchAddEmailRequest => ({
    type: addEmailTypes.FETCH_ADDEMAIL_REQUEST,
    payload
});

export const fetchAddEmailSuccess = (
    payload: FetchAddEmailSuccessPayload
): FetchAddEmailSuccess => ({
    type: addEmailTypes.FETCH_ADDEMAIL_SUCCESS,
    payload
});

export const fetchAddEmailFailure = (
    payload: FetchPostsFailurePayload
): FetchAddEmailFailure => ({
    type: addEmailTypes.FETCH_ADDEMAIL_FAILURE,
    payload
});
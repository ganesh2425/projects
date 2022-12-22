import { getACAMessageTemplateTypes } from "../../constants/actionTypes";
import {
    FetchGetACAMessageTemplateFailure,
    FetchPostsFailurePayload,
    FetchGetACAMessageTemplateRequest,
    FetchGetACAMessageTemplateSuccess,
    GetAcaMessageTemplateResponse,
    FetchGetACAMessageTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchGetACAMessageTemplateRequest = (payload: any): FetchGetACAMessageTemplateRequest => ({
    type: getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_REQUEST,
    payload
});

export const fetchGetACAMessageTemplateSuccess = (
    payload: any
): FetchGetACAMessageTemplateSuccess => ({
    type: getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_SUCCESS,
    payload
});

export const fetchGetACAMessageTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchGetACAMessageTemplateFailure => ({
    type: getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_FAILURE,
    payload
});



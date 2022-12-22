import { getACAEmailTemplateTypes } from "../../constants/actionTypes";
import {
    FetchGetACAEmailTemplateFailure,
    FetchPostsFailurePayload,
    FetchGetACAEmailTemplateRequest,
    FetchGetACAEmailTemplateSuccess,
    GetAcaEmailTemplateResponse,
    FetchGetACAEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchGetACAEmailTemplateRequest = (payload: any): FetchGetACAEmailTemplateRequest => ({
    type: getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_REQUEST,
    payload
});

export const fetchGetACAEmailTemplateSuccess = (
    payload: any
): FetchGetACAEmailTemplateSuccess => ({
    type: getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_SUCCESS,
    payload
});

export const fetchGetACAEmailTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchGetACAEmailTemplateFailure => ({
    type: getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_FAILURE,
    payload
});



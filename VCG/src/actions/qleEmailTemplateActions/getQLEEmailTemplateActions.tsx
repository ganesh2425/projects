import { AnyAaaaRecord } from "dns";
import { getQLEEmailTemplateTypes } from "../../constants/actionTypes";
import {
    FetchGetQLEEmailTemplateFailure,
    FetchPostsFailurePayload,
    FetchGetQLEEmailTemplateRequest,
    FetchGetQLEEmailTemplateSuccess,
    GetEmailTemplateResponse,
    FetchGetQLEEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchGetQLEEmailTemplateRequest = (payload: any): FetchGetQLEEmailTemplateRequest => ({
    type: getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_REQUEST,
    payload
});

export const fetchGetQLEEmailTemplateSuccess = (
    payload: any
): FetchGetQLEEmailTemplateSuccess => ({
    type: getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_SUCCESS,
    payload
});

export const fetchGetQLEEmailTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchGetQLEEmailTemplateFailure => ({
    type: getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_FAILURE,
    payload
});



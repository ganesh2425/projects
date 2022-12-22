import { AnyAaaaRecord } from "dns";
import { getQLEMessageTemplateTypes } from "../../constants/actionTypes";
import {
    FetchGetQLEMessageTemplateFailure,
    FetchPostsFailurePayload,
    FetchGetQLEMessageTemplateRequest,
    FetchGetQLEMessageTemplateSuccess,
    GetQLEMessageTemplateResponse,
    FetchGetQLEMessageTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchGetQLEMessageTemplateRequest = (payload: any): FetchGetQLEMessageTemplateRequest => ({
    type: getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_REQUEST,
    payload
});

export const fetchGetQLEMessageTemplateSuccess = (
    payload: any
): FetchGetQLEMessageTemplateSuccess => ({
    type: getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_SUCCESS,
    payload
});

export const fetchGetQLEMessageTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchGetQLEMessageTemplateFailure => ({
    type: getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_FAILURE,
    payload
});



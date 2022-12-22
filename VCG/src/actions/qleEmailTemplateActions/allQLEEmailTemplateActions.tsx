import { allQLEEmailTemplateTypes } from "../../constants/actionTypes";
import {
    FetchAllQLEEmailTemplateFailure,
    FetchPostsFailurePayload,
    FetchAllQLEEmailTemplateRequest,
    FetchAllQLEEmailTemplateSuccess,
    FetchAllQLEEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchAllQLEEmailTemplateRequest = (payload: any): FetchAllQLEEmailTemplateRequest => ({
    type: allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_REQUEST,
    payload
});

export const fetchAllQLEEmailTemplateSuccess = (
    payload: FetchAllQLEEmailTemplateSuccessPayload
): FetchAllQLEEmailTemplateSuccess => ({
    type: allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_SUCCESS,
    payload
});

export const fetchAllQLEEmailTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchAllQLEEmailTemplateFailure => ({
    type: allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_FAILURE,
    payload
});



import { editQLEEmailTemplateTypes } from "../../constants/actionTypes";
import {
    FetchEditQLEEmailTemplateFailure,
    FetchPostsFailurePayload,
    FetchEditQLEEmailTemplateRequest,
    FetchEditQLEEmailTemplateSuccess,
    EditQLEEmailTemplate, AuthResponse, AddRole,
    FetchEditQLEEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchEditQLEEmailTemplateRequest = (payload: EditQLEEmailTemplate): FetchEditQLEEmailTemplateRequest => ({
    type: editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_REQUEST,
    payload
});

export const fetchEditQLEEmailTemplateSuccess = (
    payload: FetchEditQLEEmailTemplateSuccessPayload
): FetchEditQLEEmailTemplateSuccess => ({
    type: editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_SUCCESS,
    payload
});

export const fetchEditQLEEmailTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchEditQLEEmailTemplateFailure => ({
    type: editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_FAILURE,
    payload
});



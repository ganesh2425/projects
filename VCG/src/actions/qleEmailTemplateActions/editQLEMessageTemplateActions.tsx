import { editQLEMessageTemplateTypes } from "../../constants/actionTypes";
import {
    FetchEditQLEMessageTemplateFailure,
    FetchPostsFailurePayload,
    FetchEditQLEMessageTemplateRequest,
    FetchEditQLEMessageTemplateSuccess,
    EditQLEMessageTemplate, AuthResponse, AddRole,
    FetchEditQLEMessageTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchEditQLEMessageTemplateRequest = (payload: EditQLEMessageTemplate): FetchEditQLEMessageTemplateRequest => ({
    type: editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_REQUEST,
    payload
});

export const fetchEditQLEMessageTemplateSuccess = (
    payload: FetchEditQLEMessageTemplateSuccessPayload
): FetchEditQLEMessageTemplateSuccess => ({
    type: editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_SUCCESS,
    payload
});

export const fetchEditQLEMessageTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchEditQLEMessageTemplateFailure => ({
    type: editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_FAILURE,
    payload
});



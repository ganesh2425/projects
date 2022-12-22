import { editACAMessageTemplateTypes } from "../../constants/actionTypes";
import {
    FetchEditACAMessageTemplateFailure,
    FetchPostsFailurePayload,
    FetchEditACAMessageTemplateRequest,
    FetchEditACAMessageTemplateSuccess,
    EditACAMessageTemplate, AuthResponse, AddRole,
    FetchEditACAMessageTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchEditACAMessageTemplateRequest = (payload: EditACAMessageTemplate): FetchEditACAMessageTemplateRequest => ({
    type: editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_REQUEST,
    payload
});

export const fetchEditACAMessageTemplateSuccess = (
    payload: FetchEditACAMessageTemplateSuccessPayload
): FetchEditACAMessageTemplateSuccess => ({
    type: editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_SUCCESS,
    payload
});

export const fetchEditACAMessageTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchEditACAMessageTemplateFailure => ({
    type: editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_FAILURE,
    payload
});



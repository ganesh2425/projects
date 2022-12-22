import { editACAEmailTemplateTypes } from "../../constants/actionTypes";
import {
    FetchEditACAEmailTemplateFailure,
    FetchPostsFailurePayload,
    FetchEditACAEmailTemplateRequest,
    FetchEditACAEmailTemplateSuccess,
    EditACAEmailTemplate, AuthResponse, AddRole,
    FetchEditACAEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchEditACAEmailTemplateRequest = (payload: EditACAEmailTemplate): FetchEditACAEmailTemplateRequest => ({
    type: editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_REQUEST,
    payload
});

export const fetchEditACAEmailTemplateSuccess = (
    payload: FetchEditACAEmailTemplateSuccessPayload
): FetchEditACAEmailTemplateSuccess => ({
    type: editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_SUCCESS,
    payload
});

export const fetchEditACAEmailTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchEditACAEmailTemplateFailure => ({
    type: editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_FAILURE,
    payload
});



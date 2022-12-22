import { allACAEmailTemplateTypes } from "../../constants/actionTypes";
import {
    FetchAllACAEmailTemplateFailure,
    FetchPostsFailurePayload,
    FetchAllACAEmailTemplateRequest,
    FetchAllACAEmailTemplateSuccess,
    FetchAllACAEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchAllACAEmailTemplateRequest = (payload: any): FetchAllACAEmailTemplateRequest => ({
    type: allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_REQUEST,
    payload
});

export const fetchAllACAEmailTemplateSuccess = (
    payload: FetchAllACAEmailTemplateSuccessPayload
): FetchAllACAEmailTemplateSuccess => ({
    type: allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_SUCCESS,
    payload
});

export const fetchAllACAEmailTemplateFailure = (
    payload: FetchPostsFailurePayload
): FetchAllACAEmailTemplateFailure => ({
    type: allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_FAILURE,
    payload
});



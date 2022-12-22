import { getACAPreviewTypes } from "../../constants/actionTypes";
import {
    FetchGetACAPreviewFailure,
    FetchPostsFailurePayload,
    FetchGetACAPreviewRequest,
    FetchGetACAPreviewSuccess,
    GetAcaEmailTemplateResponse,
    FetchGetACAEmailTemplateSuccessPayload,
} from "../../interfaces/types";

export const fetchGetACAPreviewRequest = (payload: any): FetchGetACAPreviewRequest => ({
    type: getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_REQUEST,
    payload
});

export const fetchGetACAPreviewSuccess = (
    payload: any
): FetchGetACAPreviewSuccess => ({
    type: getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_SUCCESS,
    payload
});

export const fetchGetACAPreviewFailure = (
    payload: FetchPostsFailurePayload
): FetchGetACAPreviewFailure => ({
    type: getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_FAILURE,
    payload
});



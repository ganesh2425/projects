import { getACADownloadTypes } from "../../constants/actionTypes";
import {
    FetchGetACADownloadFailure,
    FetchPostsFailurePayload,
    FetchGetACADownloadRequest,
    FetchGetACADownloadSuccess
} from "../../interfaces/types";

export const fetchGetACADownloadRequest = (payload: any): FetchGetACADownloadRequest => ({
    type: getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_REQUEST,
    payload
});

export const fetchGetACADownloadSuccess = (
    payload: any
): FetchGetACADownloadSuccess => ({
    type: getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_SUCCESS,
    payload
});

export const fetchGetACADownloadFailure = (
    payload: FetchPostsFailurePayload
): FetchGetACADownloadFailure => ({
    type: getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_FAILURE,
    payload
});



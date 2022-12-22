import { getUploadImageTypes } from "../../constants/actionTypes";
import {
    FetchGetUploadImageFailure,
    FetchPostsFailurePayload,
    FetchGetUploadImageRequest,
    FetchGetUploadImageSuccess
} from "../../interfaces/types";

export const fetchGetUploadImageRequest = (payload: any): FetchGetUploadImageRequest => ({
    type: getUploadImageTypes.FETCH_GET_UPLOADIMAGE_REQUEST,
    payload
});

export const fetchGetUploadImageSuccess = (
    payload: any
): FetchGetUploadImageSuccess => ({
    type: getUploadImageTypes.FETCH_GET_UPLOADIMAGE_SUCCESS,
    payload
});

export const fetchGetUploadImageFailure = (
    payload: FetchPostsFailurePayload
): FetchGetUploadImageFailure => ({
    type: getUploadImageTypes.FETCH_GET_UPLOADIMAGE_FAILURE,
    payload
});



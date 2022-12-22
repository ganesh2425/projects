import { uploadImageTypes } from "../../constants/actionTypes";
import {
    FetchUploadImageFailure,
    FetchPostsFailurePayload,
    FetchUploadImageRequest,
    FetchUploadImageSuccess,
     AuthResponse,
     FetchUploadImageSuccessPayload
} from "../../interfaces/types";

export const fetchUploadImageRequest = (payload: any): FetchUploadImageRequest => ({
    type: uploadImageTypes.FETCH_UPLOADIMAGE_REQUEST,
    payload
});

export const fetchUploadImageSuccess = (
    payload: FetchUploadImageSuccessPayload
): FetchUploadImageSuccess => ({
    type: uploadImageTypes.FETCH_UPLOADIMAGE_SUCCESS,
    payload
});

export const fetchUploadImageFailure = (
    payload: FetchPostsFailurePayload
): FetchUploadImageFailure => ({
    type: uploadImageTypes.FETCH_UPLOADIMAGE_FAILURE,
    payload
});

export const setUploadImageAction = (payload: any, history: any) => ({
    type: uploadImageTypes.UPLOADIMAGE_INFO,
    payload,
    history
});


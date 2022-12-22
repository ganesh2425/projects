import { filesTypes } from "../../constants/actionTypes";
import {
    FetchFilesFailure,
    FetchPostsFailurePayload,
    FetchFilesRequest,
    FetchFilesSuccess,
     AuthResponse,
     FetchSTEP3SuccessPayload
} from "../../interfaces/types";

export const fetchFilesRequest = (payload: any): FetchFilesRequest => ({
    type: filesTypes.FETCH_FILES_REQUEST,
    payload
});

export const fetchFilesSuccess = (
    payload: FetchSTEP3SuccessPayload
): FetchFilesSuccess => ({
    type: filesTypes.FETCH_FILES_SUCCESS,
    payload
});

export const fetchFilesFailure = (
    payload: FetchPostsFailurePayload
): FetchFilesFailure => ({
    type: filesTypes.FETCH_FILES_FAILURE,
    payload
});

export const setFilesAction = (payload: any, history: any) => ({
    type: filesTypes.FILES_INFO,
    payload,
    history
});


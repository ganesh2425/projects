import { filesViewTypes } from "../../constants/actionTypes";
import {
    FetchFilesViewFailure,
    FetchPostsFailurePayload,
    FetchFilesViewRequest,
    FetchFilesViewSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchFilesViewRequest = (payload: any): FetchFilesViewRequest => ({
    type: filesViewTypes.FETCH_FILESVIEW_REQUEST,
    payload
});

export const fetchFilesViewSuccess = (
    payload: any
): FetchFilesViewSuccess => ({
    type: filesViewTypes.FETCH_FILESVIEW_SUCCESS,
    payload
});

export const fetchFilesViewFailure = (
    payload: FetchPostsFailurePayload
): FetchFilesViewFailure => ({
    type: filesViewTypes.FETCH_FILESVIEW_FAILURE,
    payload
});

export const setFilesViewAction = (payload: any, history: any) => ({
    type: filesViewTypes.FILESVIEW_INFO,
    payload,
    history
});


import { filesDeleteTypes } from "../../constants/actionTypes";
import {
    FetchDeleteFilesFailure,
    FetchPostsFailurePayload,
    FetchDeleteFilesRequest,
    FetchDeleteFilesSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchDeleteFilesRequest = (payload: any): FetchDeleteFilesRequest => ({
    type: filesDeleteTypes.FETCH_DELETEFILES_REQUEST,
    payload
});

export const fetchFilesDeleteSuccess = (
    payload: any
): FetchDeleteFilesSuccess => ({
    type: filesDeleteTypes.FETCH_DELETEFILES_SUCCESS,
    payload
});

export const fetchFilesDeleteFailure = (
    payload: FetchPostsFailurePayload
): FetchDeleteFilesFailure => ({
    type: filesDeleteTypes.FETCH_DELETEFILESE_FAILURE,
    payload
});

export const setDeleteFilesAction = (payload: any, history: any) => ({
    type: filesDeleteTypes.DELETEFILESE_INFO,
    payload,
    history
});


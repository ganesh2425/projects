import { viewFileTypes } from "../constants/actionTypes";
import {
    FetchviewFileFailure,
    FetchPostsFailurePayload,
    FetchviewFileRequest,
    FetchviewFileSuccess,
    FetchviewFileSuccessPayload,
     AuthResponse
} from "../interfaces/types";

export const fetchviewFileRequest = (payload: any): FetchviewFileRequest => ({
    type: viewFileTypes.FETCH_VIEWFILE_REQUEST,
    payload
});

export const fetchviewFileSuccess = (
    payload: FetchviewFileSuccessPayload
): FetchviewFileSuccess => ({
    type: viewFileTypes.FETCH_VIEWFILE_SUCCESS,
    payload
});

export const fetchviewFileFailure = (
    payload: FetchPostsFailurePayload
): FetchviewFileFailure => ({
    type: viewFileTypes.FETCH_VIEWFILE_FAILURE,
    payload
});

export const setviewFileAction = (payload: any, history: any) => ({
    type: viewFileTypes.VIEWFILE_INFO,
    payload,
    history
});

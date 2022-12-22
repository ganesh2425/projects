import { editInfoTypes } from "../../constants/actionTypes";
import {
    FetchEditFailure,
    FetchPostsFailurePayload,
    FetchEditRequest,
    FetchEditSuccess,
    FetchEditSuccessPayload,
} from "../../interfaces/types";

export const fetchEditRequest = (payload: any): FetchEditRequest => ({
    type: editInfoTypes.FETCH_EDIT_REQUEST,
    payload
});

export const fetchEditSuccess = (
    payload: FetchEditSuccessPayload
): FetchEditSuccess => ({
    type: editInfoTypes.FETCH_EDIT_SUCCESS,
    payload
});

export const fetchEditFailure = (
    payload: FetchPostsFailurePayload
): FetchEditFailure => ({
    type: editInfoTypes.FETCH_EDIT_FAILURE,
    payload
});

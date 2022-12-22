import { notesTypes } from "../../constants/actionTypes";
import {
    FetchNotesFailure,
    FetchPostsFailurePayload,
    FetchNotesRequest,
    FetchNotesSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchNotesRequest = (payload: any): FetchNotesRequest => ({
    type: notesTypes.FETCH_NOTES_REQUEST,
    payload
});

export const fetchNotesSuccess = (
    payload: any
): FetchNotesSuccess => ({
    type: notesTypes.FETCH_NOTES_SUCCESS,
    payload
});

export const fetchNotesFailure = (
    payload: FetchPostsFailurePayload
): FetchNotesFailure => ({
    type: notesTypes.FETCH_NOTES_FAILURE,
    payload
});

export const setNotesAction = (payload: any, history: any) => ({
    type: notesTypes.NOTES_INFO,
    payload,
    history
});


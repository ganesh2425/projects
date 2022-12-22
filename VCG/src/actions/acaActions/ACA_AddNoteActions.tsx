import { addNoteTypes } from "../../constants/actionTypes";
import {
    FetchAddNoteFailure,
    FetchPostsFailurePayload,
    FetchAddNoteRequest,
    FetchAddNoteSuccess,
    AddNote, AuthResponse,
    FetchAddNoteSuccessPayload,
} from "../../interfaces/types";

export const fetchAddNoteRequest = (payload: AddNote): FetchAddNoteRequest => ({
    type: addNoteTypes.FETCH_ADDNOTE_REQUEST,
    payload
});

export const fetchAddNoteSuccess = (
    payload: FetchAddNoteSuccessPayload
): FetchAddNoteSuccess => ({
    type: addNoteTypes.FETCH_ADDNOTE_SUCCESS,
    payload
});

export const fetchAddNoteFailure = (
    payload: FetchPostsFailurePayload
): FetchAddNoteFailure => ({
    type: addNoteTypes.FETCH_ADDNOTE_FAILURE,
    payload
});
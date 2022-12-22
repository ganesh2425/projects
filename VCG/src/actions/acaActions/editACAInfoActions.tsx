import { editACAInfoTypes } from "../../constants/actionTypes";
import {
    FetchEditACAInfoFailure,
    FetchPostsFailurePayload,
    FetchEditACAInfoRequest,
    FetchEditACAInfoSuccess,
    EditACAInfo,
    FetchEditACAInfoSuccessPayload,
} from "../../interfaces/types";

export const fetchEditACAInfoRequest = (payload: EditACAInfo):  FetchEditACAInfoRequest => ({
    type: editACAInfoTypes.FETCH_EDITACAINFO_REQUEST,
    payload
});

export const fetchEditACAInfoSuccess = (
    payload: FetchEditACAInfoSuccessPayload
): FetchEditACAInfoSuccess => ({
    type: editACAInfoTypes.FETCH_EDITACAINFO_SUCCESS,
    payload
});

export const fetchEditACAInfoFailure = (
    payload: FetchPostsFailurePayload
): FetchEditACAInfoFailure => ({
    type: editACAInfoTypes.FETCH_EDITACAINFO_FAILURE,
    payload
});



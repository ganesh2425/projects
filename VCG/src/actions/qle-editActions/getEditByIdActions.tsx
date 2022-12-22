import { getEditByIdTypes } from "../../constants/actionTypes";
import {
    FetchGetEditByIdFailure,
    FetchPostsFailurePayload,
    FetchGetEditByIdRequest,
    FetchGetEditByIdSuccess,
     AuthResponse
} from "../../interfaces/types";

export const fetchGetEditByIdRequest = (payload: any): FetchGetEditByIdRequest => ({
    type: getEditByIdTypes.FETCH_GETEDITBYID_REQUEST,
    payload
});

export const fetchGetEditByIdSuccess = (
    payload: any
): FetchGetEditByIdSuccess => ({
    type: getEditByIdTypes.FETCH_GETEDITBYID_SUCCESS,
    payload
});

export const fetchGetEditByIdFailure = (
    payload: FetchPostsFailurePayload
): FetchGetEditByIdFailure => ({
    type: getEditByIdTypes.FETCH_GETEDITBYID_FAILURE,
    payload
});

export const setGetEditByIdAction = (payload: any, history: any) => ({
    type: getEditByIdTypes.GETEDITBYID_INFO,
    payload,
    history
});

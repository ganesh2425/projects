import { slugTypes } from "../constants/actionTypes";
import {
    FetchPostsFailurePayload,
    FetchSlugRequest,
    FetchSlugSuccess,
    FetchSlugFailure,
} from "../interfaces/types";

export const fetchSlugRequest = (payload: any): FetchSlugRequest => ({
    type: slugTypes.FETCH_SLUG_REQUEST,
    payload
});

export const fetchSlugSuccess = (
    payload: any
): FetchSlugSuccess => ({
    type: slugTypes.FETCH_SLUG_SUCCESS,
    payload
});

export const fetchSlugFailure = (
    payload: FetchPostsFailurePayload
): FetchSlugFailure => ({
    type: slugTypes.FETCH_SLUG_FAILURE,
    payload
});

export const setSlugAction = (payload: any, history: any) => ({
    type: slugTypes.SLUG_INFO,
    payload,
    history
});

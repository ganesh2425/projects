import { homeTypes } from "../constants/actionTypes";
import {
    FetchHOMEFailure,
    FetchPostsFailurePayload,
    FetchHOMERequest,
    FetchHOMESuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchHOMERequest = (payload: any): FetchHOMERequest => ({
    type: homeTypes.FETCH_HOME_REQUEST,
    payload
});

export const fetchHOMESuccess = (
    payload: any
): FetchHOMESuccess => ({
    type: homeTypes.FETCH_HOME_SUCCESS,
    payload
});

export const fetchHOMEFailure = (
    payload: FetchPostsFailurePayload
): FetchHOMEFailure => ({
    type: homeTypes.FETCH_HOME_FAILURE,
    payload
});

export const setHOMEAction = (payload: any, history: any) => ({
    type: homeTypes.HOME_INFO,
    payload,
    history
});

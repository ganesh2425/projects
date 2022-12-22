import { AnyAaaaRecord } from "dns";
import { getUserTypes } from "../../constants/actionTypes";
import {
    FetchGetUserFailure,
    FetchPostsFailurePayload,
    FetchGetUserRequest,
    FetchGetUserSuccess,
    GetUserResponse,
    FetchGetUserSuccessPayload,
} from "../../interfaces/types";

export const fetchGetUserRequest = (payload: any): FetchGetUserRequest => ({
    type: getUserTypes.FETCH_GETUSER_REQUEST,
    payload
});

export const fetchGetUserSuccess = (
    payload: any
): FetchGetUserSuccess => ({
    type: getUserTypes.FETCH_GETUSER_SUCCESS,
    payload
});

export const fetchGetUserFailure = (
    payload: FetchPostsFailurePayload
): FetchGetUserFailure => ({
    type: getUserTypes.FETCH_GETUSER_FAILURE,
    payload
});



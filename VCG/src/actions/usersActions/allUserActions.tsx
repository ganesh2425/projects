import { UserTypes } from "../../constants/actionTypes";
import {
    FetchUserFailure,
    FetchPostsFailurePayload,
    FetchUserRequest,
    FetchUserSuccess,
    FetchUserSuccessPayload,
} from "../../interfaces/types";

export const fetchUserRequest = (payload: any): FetchUserRequest => ({
   
    type: UserTypes.FETCH_USER_REQUEST,
    payload
});

export const fetchUSERSuccess = (
    payload:FetchUserSuccessPayload
): FetchUserSuccess => ({
    type: UserTypes.FETCH_USER_SUCCESS ,
    payload
});

export const fetchUserFailure = (
    payload: FetchPostsFailurePayload
):FetchUserFailure => ({
    type: UserTypes.FETCH_USER_FAILURE,
    payload
});


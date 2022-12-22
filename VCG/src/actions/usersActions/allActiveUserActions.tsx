import { ActiveUserTypes } from "../../constants/actionTypes";
import {
    FetchActiveUserFailure,
    FetchPostsFailurePayload,
    FetchActiveUserSuccess,
    FetchActiveUserSuccessPayload,
    FetchActiveUserRequest,
} from "../../interfaces/types";

export const fetchActiveUserRequest = (payload: any): FetchActiveUserRequest=> ({
   
    type: ActiveUserTypes.FETCH_ACTIVE_USER_REQUEST,
    payload
});

export const fetchActiveUSERSuccess = (
    payload:FetchActiveUserSuccessPayload
): FetchActiveUserSuccess => ({
    type: ActiveUserTypes.FETCH_ACTIVE_USER_SUCCESS,
    payload
});

export const fetchActiveUserFailure = (
    payload: FetchPostsFailurePayload
):FetchActiveUserFailure => ({
    type: ActiveUserTypes.FETCH_ACTIVE_USER_FAILURE,
    payload
});


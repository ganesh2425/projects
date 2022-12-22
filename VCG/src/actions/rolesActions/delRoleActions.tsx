import { delRoleTypes } from "../../constants/actionTypes";
import {
    FetchDelRoleFailure,
    FetchPostsFailurePayload,
    FetchDelRoleRequest,
    FetchDelRoleSuccess,
    DelResponse
} from "../../interfaces/types";

export const fetchDelRoleRequest = (payload: any): FetchDelRoleRequest => ({
    type: delRoleTypes.FETCH_DELROLE_REQUEST,
    payload
});

export const fetchDelRoleSuccess = (
    payload: DelResponse
): FetchDelRoleSuccess => ({
    type: delRoleTypes.FETCH_DELROLE_SUCCESS,
    payload
});

export const fetchDelRoleFailure = (
    payload: FetchPostsFailurePayload
): FetchDelRoleFailure => ({
    type: delRoleTypes.FETCH_DELROLE_FAILURE,
    payload
});



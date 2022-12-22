import { AnyAaaaRecord } from "dns";
import { getRoleTypes } from "../../constants/actionTypes";
import {
    FetchGetRoleFailure,
    FetchPostsFailurePayload,
    FetchGetRoleRequest,
    FetchGetRoleSuccess,
    GetRoleResponse,
    FetchGetRoleSuccessPayload,
} from "../../interfaces/types";

export const fetchGetRoleRequest = (payload: any): FetchGetRoleRequest => ({
    type: getRoleTypes.FETCH_GETROLE_REQUEST,
    payload
});

export const fetchGetRoleSuccess = (
    payload: any
): FetchGetRoleSuccess => ({
    type: getRoleTypes.FETCH_GETROLE_SUCCESS,
    payload
});

export const fetchGetRoleFailure = (
    payload: FetchPostsFailurePayload
): FetchGetRoleFailure => ({
    type: getRoleTypes.FETCH_GETROLE_FAILURE,
    payload
});



import { allRolesetTypes } from "../../constants/actionTypes";
import {
    FetchAllRolesetFailure,
    FetchPostsFailurePayload,
    FetchAllRolesetRequest,
    FetchAllRolesetSuccess,
    FetchAllRolesetSuccessPayload,
} from "../../interfaces/types";

export const fetchAllRolesetRequest = (payload: any): FetchAllRolesetRequest => ({
    type: allRolesetTypes.FETCH_ALLROLESET_REQUEST,
    payload
});

export const fetchAllRolesetSuccess = (
    payload: FetchAllRolesetSuccessPayload
): FetchAllRolesetSuccess => ({
    type: allRolesetTypes.FETCH_ALLROLESET_SUCCESS,
    payload
});

export const fetchAllRolesetFailure = (
    payload: FetchPostsFailurePayload
): FetchAllRolesetFailure => ({
    type: allRolesetTypes.FETCH_ALLROLESET_FAILURE,
    payload
});



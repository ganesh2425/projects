import { allRolesTypes } from "../../constants/actionTypes";
import {
    FetchAllRolesFailure,
    FetchPostsFailurePayload,
    FetchAllRolesRequest,
    FetchAllRolesSuccess,
    FetchAllRolesSuccessPayload,
} from "../../interfaces/types";

export const fetchAllRolesRequest = (payload: any): FetchAllRolesRequest => ({
    type: allRolesTypes.FETCH_ALLROLES_REQUEST,
    payload
});

export const fetchAllRolesSuccess = (
    payload: FetchAllRolesSuccessPayload
): FetchAllRolesSuccess => ({
    type: allRolesTypes.FETCH_ALLROLES_SUCCESS,
    payload
});

export const fetchAllRolesFailure = (
    payload: FetchPostsFailurePayload
): FetchAllRolesFailure => ({
    type: allRolesTypes.FETCH_ALLROLES_FAILURE,
    payload
});



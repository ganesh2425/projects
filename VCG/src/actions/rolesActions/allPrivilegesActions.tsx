import { allPrivilegesTypes } from "../../constants/actionTypes";
import {
    FetchAllPrivilegesFailure,
    FetchPostsFailurePayload,
    FetchAllPrivilegesRequest,
    FetchAllPrivilegesSuccess,
    FetchAllPrivilegesSuccessPayload,
} from "../../interfaces/types";

export const fetchAllPrivilegesRequest = (payload: any): FetchAllPrivilegesRequest => ({
    type: allPrivilegesTypes.FETCH_ALLPRIVILEGES_REQUEST,
    payload
});

export const fetchAllPrivilegesSuccess = (
    payload: FetchAllPrivilegesSuccessPayload
): FetchAllPrivilegesSuccess => ({
    type: allPrivilegesTypes.FETCH_ALLPRIVILEGES_SUCCESS,
    payload
});

export const fetchAllPrivilegesFailure = (
    payload: FetchPostsFailurePayload
): FetchAllPrivilegesFailure => ({
    type: allPrivilegesTypes.FETCH_ALLPRIVILEGES_FAILURE,
    payload
});



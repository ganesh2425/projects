
import { getUserProfileTypes } from "../../constants/actionTypes";
import {
    FetchGetUserProfileFailure,
    FetchPostsFailurePayload,
    FetchGetUserProfileRequest,
    FetchGetUserProfileSuccess,
    GetEmployerResponse,
    FetchGetEmployerSuccessPayload,
} from "../../interfaces/types";

export const fetchGetUserProfileRequest = (payload: any): FetchGetUserProfileRequest => ({
    type: getUserProfileTypes.FETCH_GETUSERPROFILE_REQUEST,
    payload
});

export const fetchGetUserProfileSuccess = (
    payload: any
): FetchGetUserProfileSuccess => ({
    type: getUserProfileTypes.FETCH_GETUSERPROFILE_SUCCESS,
    payload
});

export const fetchGetUserProfileFailure = (
    payload: FetchPostsFailurePayload
): FetchGetUserProfileFailure => ({
    type: getUserProfileTypes.FETCH_GETUSERPROFILE_FAILURE,
    payload
});



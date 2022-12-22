import { editUserProfileTypes } from "../../constants/actionTypes";
import {
    FetchEditUserProfileFailure,
    FetchPostsFailurePayload,
    FetchEditUserProfileRequest,
    FetchEditUserProfileSuccess,
    EditUserProfile, AuthResponse, AddEmployer,
    FetchEditUserProfileSuccessPayload,
} from "../../interfaces/types";

export const fetchEditUserProfileRequest = (payload: EditUserProfile): FetchEditUserProfileRequest => ({
    type: editUserProfileTypes.FETCH_EDITUSERPROFILE_REQUEST,
    payload
});

export const fetchEditUserProfileSuccess = (
    payload: FetchEditUserProfileSuccessPayload
): FetchEditUserProfileSuccess => ({
    type: editUserProfileTypes.FETCH_EDITUSERPROFILE_SUCCESS,
    payload
});

export const fetchEditUserProfileFailure = (
    payload: FetchPostsFailurePayload
): FetchEditUserProfileFailure => ({
    type: editUserProfileTypes.FETCH_EDITUSERPROFILE_FAILURE,
    payload
});



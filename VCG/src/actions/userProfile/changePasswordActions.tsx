import { changeUserProfilePasswordTypes } from "../../constants/actionTypes";
import {
    FetchChangeUserProfilePasswordFailure,
    FetchPostsFailurePayload,
    FetchChangeUserProfilePasswordRequest,
    FetchChangeUserProfilePasswordSuccess,
    ChangeUserProfilePassword, AuthResponse, AddEmployer,
    FetchChangeUserProfilePasswordSuccessPayload,
} from "../../interfaces/types";

export const fetchChangeUserProfilePasswordRequest = (payload: ChangeUserProfilePassword): FetchChangeUserProfilePasswordRequest => ({
    type: changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_REQUEST,
    payload
});

export const fetchChangeUserProfilePasswordSuccess = (
    payload: FetchChangeUserProfilePasswordSuccessPayload
): FetchChangeUserProfilePasswordSuccess => ({
    type: changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_SUCCESS,
    payload
});

export const fetchChangeUserProfilePasswordFailure = (
    payload: FetchPostsFailurePayload
): FetchChangeUserProfilePasswordFailure => ({
    type: changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_FAILURE,
    payload
});



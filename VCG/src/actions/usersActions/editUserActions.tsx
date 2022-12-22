import { editUserTypes } from "../../constants/actionTypes";
import {
    FetchEditUserFailure,
    FetchPostsFailurePayload,
    FetchEditUserRequest,
    FetchEditUserSuccess,
    EditUser, AuthResponse, AddUser,
    FetchEditUserSuccessPayload,
} from "../../interfaces/types";

export const fetchEditUserRequest = (payload: EditUser): FetchEditUserRequest => ({
    type: editUserTypes.FETCH_EDITUSER_REQUEST,
    payload
});

// export const fetchAddRoleSuccess = (
//     payload: AuthResponse
// ): FetchAddRoleSuccess => ({
//     type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
//     payload
// });

export const fetchEditUserSuccess = (
    payload: FetchEditUserSuccessPayload
): FetchEditUserSuccess => ({
    type: editUserTypes.FETCH_EDITUSER_SUCCESS,
    payload
});

export const fetchEditUserFailure = (
    payload: FetchPostsFailurePayload
): FetchEditUserFailure => ({
    type: editUserTypes.FETCH_EDITUSER_FAILURE,
    payload
});



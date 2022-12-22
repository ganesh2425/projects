import { addUserTypes } from "../../constants/actionTypes";
import {
    FetchAddUserFailure,
    FetchPostsFailurePayload,
    FetchAddUserRequest,
    FetchAddUserSuccess,
    AddUser, AuthResponse,
    FetchAddUserSuccessPayload,
} from "../../interfaces/types";

export const fetchAddUserRequest = (payload: AddUser): FetchAddUserRequest => ({
    type: addUserTypes.FETCH_ADDUSER_REQUEST,
    payload
});

// export const fetchAddRoleSuccess = (
//     payload: AuthResponse
// ): FetchAddRoleSuccess => ({
//     type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
//     payload
// });

export const fetchAddUserSuccess = (
    payload: FetchAddUserSuccessPayload
): FetchAddUserSuccess => ({
    type: addUserTypes.FETCH_ADDUSER_SUCCESS,
    payload
});

export const fetchAddUserFailure = (
    payload: FetchPostsFailurePayload
): FetchAddUserFailure => ({
    type: addUserTypes.FETCH_ADDUSER_FAILURE,
    payload
});



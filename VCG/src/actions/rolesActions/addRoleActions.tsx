import { addRoleTypes } from "../../constants/actionTypes";
import {
    FetchAddRoleFailure,
    FetchPostsFailurePayload,
    FetchAddRoleRequest,
    FetchAddRoleSuccess,
    AddRole, AuthResponse,
    FetchAddRoleSuccessPayload,
} from "../../interfaces/types";

export const fetchAddRoleRequest = (payload: AddRole): FetchAddRoleRequest => ({
    type: addRoleTypes.FETCH_ADDROLE_REQUEST,
    payload
});

// export const fetchAddRoleSuccess = (
//     payload: AuthResponse
// ): FetchAddRoleSuccess => ({
//     type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
//     payload
// });

export const fetchAddRoleSuccess = (
    payload: FetchAddRoleSuccessPayload
): FetchAddRoleSuccess => ({
    type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
    payload
});

export const fetchAddRoleFailure = (
    payload: FetchPostsFailurePayload
): FetchAddRoleFailure => ({
    type: addRoleTypes.FETCH_ADDROLE_FAILURE,
    payload
});



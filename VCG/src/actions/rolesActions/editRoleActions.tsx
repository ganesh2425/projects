import { editRoleTypes } from "../../constants/actionTypes";
import {
    FetchEditRoleFailure,
    FetchPostsFailurePayload,
    FetchEditRoleRequest,
    FetchEditRoleSuccess,
    EditRole, AuthResponse, AddRole,
    FetchEditRoleSuccessPayload,
} from "../../interfaces/types";

export const fetchEditRoleRequest = (payload: EditRole): FetchEditRoleRequest => ({
    type: editRoleTypes.FETCH_EDITROLE_REQUEST,
    payload
});

// export const fetchAddRoleSuccess = (
//     payload: AuthResponse
// ): FetchAddRoleSuccess => ({
//     type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
//     payload
// });

export const fetchEditRoleSuccess = (
    payload: FetchEditRoleSuccessPayload
): FetchEditRoleSuccess => ({
    type: editRoleTypes.FETCH_EDITROLE_SUCCESS,
    payload
});

export const fetchEditRoleFailure = (
    payload: FetchPostsFailurePayload
): FetchEditRoleFailure => ({
    type: editRoleTypes.FETCH_EDITROLE_FAILURE,
    payload
});



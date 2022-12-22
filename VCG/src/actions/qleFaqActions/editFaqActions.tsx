import { editFaqTypes, editUserTypes } from "../../constants/actionTypes";
import {
    FetchEditFaqFailure,
    FetchPostsFailurePayload,
    FetchEditFaqRequest,
    FetchEditFaqSuccess,
    EditFaq, AuthResponse,
    FetchEditFaqSuccessPayload,
} from "../../interfaces/qleFaqType";

export const fetchEditFaqRequest = (payload: EditFaq): FetchEditFaqRequest => ({
    type: editFaqTypes.FETCH_EDITFAQ_REQUEST,
    payload
});

// export const fetchAddRoleSuccess = (
//     payload: AuthResponse
// ): FetchAddRoleSuccess => ({
//     type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
//     payload
// });

export const fetchEditFaqSuccess = (
    payload: FetchEditFaqSuccessPayload
): FetchEditFaqSuccess => ({
    type: editFaqTypes.FETCH_EDITFAQ_SUCCESS,
    payload
});

export const fetchEditFaqFailure = (
    payload: FetchPostsFailurePayload
): FetchEditFaqFailure => ({
    type: editFaqTypes.FETCH_EDITFAQ_FAILURE,
    payload
});



import { addFaqTypes } from "../../constants/actionTypes";
import {
    FetchAddFaqFailure,
    FetchPostsFailurePayload,
    FetchAddFaqRequest,
    FetchAddFaqSuccess,
    AddFaq, AuthResponse,
    FetchAddFaqSuccessPayload,
} from "../../interfaces/qleFaqType";

export const fetchAddFaqRequest = (payload: AddFaq): FetchAddFaqRequest => ({
    type: addFaqTypes.FETCH_ADDFAQ_REQUEST,
    payload
});

// export const fetchAddRoleSuccess = (
//     payload: AuthResponse
// ): FetchAddRoleSuccess => ({
//     type: addRoleTypes.FETCH_ADDROLE_SUCCESS,
//     payload
// });

export const fetchAddFaqSuccess = (
    payload: FetchAddFaqSuccessPayload
): FetchAddFaqSuccess => ({
    type: addFaqTypes.FETCH_ADDFAQ_SUCCESS,
    payload
});

export const fetchAddFaqFailure = (
    payload: FetchPostsFailurePayload
): FetchAddFaqFailure => ({
    type: addFaqTypes.FETCH_ADDFAQ_FAILURE,
    payload
});



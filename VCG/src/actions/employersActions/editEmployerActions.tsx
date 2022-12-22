import { editEmployerTypes } from "../../constants/actionTypes";
import {
    FetchEditEmployerFailure,
    FetchPostsFailurePayload,
    FetchEditEmployerRequest,
    FetchEditEmployerSuccess,
    EditEmployer, AuthResponse, AddEmployer,
    FetchEditEmployerSuccessPayload,
} from "../../interfaces/types";

export const fetchEditEmployerRequest = (payload: EditEmployer): FetchEditEmployerRequest => ({
    type: editEmployerTypes.FETCH_EDITEMPLOYER_REQUEST,
    payload
});

export const fetchEditEmployerSuccess = (
    payload: FetchEditEmployerSuccessPayload
): FetchEditEmployerSuccess => ({
    type: editEmployerTypes.FETCH_EDITEMPLOYER_SUCCESS,
    payload
});

export const fetchEditEmployerFailure = (
    payload: FetchPostsFailurePayload
): FetchEditEmployerFailure => ({
    type: editEmployerTypes.FETCH_EDITEMPLOYER_FAILURE,
    payload
});



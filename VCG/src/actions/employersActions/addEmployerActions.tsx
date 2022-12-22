import { addEmployerTypes } from "../../constants/actionTypes";
import {
    FetchAddEmployerFailure,
    FetchPostsFailurePayload,
    FetchAddEmployerRequest,
    FetchAddEmployerSuccess,
    AddEmployer, AuthResponse,
    FetchAddEmployerSuccessPayload,
} from "../../interfaces/types";

export const fetchAddEmployerRequest = (payload: AddEmployer): FetchAddEmployerRequest => ({
    type: addEmployerTypes.FETCH_ADDEMPLOYER_REQUEST,
    payload
});

export const fetchAddEmployerSuccess = (
    payload: FetchAddEmployerSuccessPayload
): FetchAddEmployerSuccess => ({
    type: addEmployerTypes.FETCH_ADDEMPLOYER_SUCCESS,
    payload
});

export const fetchAddEmployerFailure = (
    payload: FetchPostsFailurePayload
): FetchAddEmployerFailure => ({
    type: addEmployerTypes.FETCH_ADDEMPLOYER_FAILURE,
    payload
});



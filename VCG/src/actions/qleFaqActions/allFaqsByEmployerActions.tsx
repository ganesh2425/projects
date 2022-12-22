import { allFaqsByEmployerTypes } from "../../constants/actionTypes";
import {
    FetchAllFaqsByEmpFailure,
    FetchPostsFailurePayload,
    FetchAllFaqsByEmpRequest,
    FetchAllFaqsByEmpSuccess,
    FetchAllQleFaqsByEmpSuccessPayload,
} from "../../interfaces/qleFaqType";

export const fetchAllFaqsByEmpRequest = (payload: any): FetchAllFaqsByEmpRequest => ({
    type: allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_REQUEST,
    payload
});

export const fetchAllFaqsByEmpSuccess = (
    payload: FetchAllQleFaqsByEmpSuccessPayload
): FetchAllFaqsByEmpSuccess => ({
    type: allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_SUCCESS,
    payload
});

export const fetchAllFaqsByEmpFailure = (
    payload: FetchPostsFailurePayload
): FetchAllFaqsByEmpFailure => ({
    type: allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_FAILURE,
    payload
});



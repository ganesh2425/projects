import { Type } from "typescript";
import { empEligibilityTypes } from "../../constants/actionTypes";
import {
    FetchEmpEligibilityFailure,
    FetchEmpEligibilityRequest,
    Eligibility,
    FetchEmpEligibilitySuccess,
    FetchEmpEligibilitySuccessPayload,
    FetchPostsFailurePayload,
} from "../../interfaces/types";

export const fetchEmpEligibilityRequest = (payload: Eligibility): FetchEmpEligibilityRequest =>({
    type: empEligibilityTypes.FETCH_EMP_ELIGIBILITY_REQUEST,
    payload
});

export const fetchEmpEligibilitySuccess = (
    payload: FetchEmpEligibilitySuccessPayload
): FetchEmpEligibilitySuccess => ({
    type: empEligibilityTypes.FETCH_EMP_ELIGIBILITY_SUCCESS,
    payload
});

export const fetchEmpEligibilityFailure = (
    payload: FetchPostsFailurePayload
): FetchEmpEligibilityFailure => ({
    type: empEligibilityTypes.FETCH_EMP_ELIGIBILITY_FAILURE,
    payload
})
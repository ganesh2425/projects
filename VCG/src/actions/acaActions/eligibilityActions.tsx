import { Type } from "typescript";
import { eligibilityTypes } from "../../constants/actionTypes";
import {
    FetchEligibilityFailure,
    FetchEligibilityRequest,
    Eligibility,
    FetchEligibilitySuccess,
    FetchEligibilitySuccessPayload,
    FetchPostsFailurePayload,
} from "../../interfaces/types";

export const fetchEligibilityRequest = (payload: any): FetchEligibilityRequest =>({
    type: eligibilityTypes.FETCH_ELIGIBILITY_REQUEST,
    payload
});

export const fetchEligibilitySuccess = (
    payload: FetchEligibilitySuccessPayload
): FetchEligibilitySuccess => ({
    type: eligibilityTypes.FETCH_ELIGIBILITY_SUCCESS,
    payload
});

export const fetchEligibilityFailure = (
    payload: FetchPostsFailurePayload
): FetchEligibilityFailure => ({
    type: eligibilityTypes.FETCH_ELIGIBILITY_FAILURE,
    payload
})
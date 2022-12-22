import { empNewYearPlanTypes } from "../../constants/actionTypes";
import {
    FetchEmpNewYearPlanFailure,
    FetchPostsFailurePayload,
    FetchEmpNewYearPlanRequest,
    FetchEmpNewYearPlanSuccess,
    FetchEmpNewYearPlanSuccessPayload
} from "../../interfaces/types";

export const fetchEmpNewYearPlanRequest = (payload): FetchEmpNewYearPlanRequest => ({
    type: empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_REQUEST,
    payload
});

export const fetchEmpNewYearPlanSuccess = (
    payload:FetchEmpNewYearPlanSuccessPayload
): FetchEmpNewYearPlanSuccess => ({
    type: empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_SUCCESS,
    payload
});

export const fetchEmpNewYearPlanFailure = (
    payload: FetchPostsFailurePayload
): FetchEmpNewYearPlanFailure => ({
    type: empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_FAILURE,
    payload
});

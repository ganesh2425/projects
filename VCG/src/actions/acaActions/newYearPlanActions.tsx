import { newYearPlanTypes } from "../../constants/actionTypes";
import {
    FetchNewYearPlanRequest,
    FetchNewYearPlanSuccess,
    FetchNewYearPlanFailure,
    FetchNewYearPlanSuccessPayload,
    FetchPostsFailurePayload,
    NewYearPlan,
} from "../../interfaces/types"

export const fetchNewYearPlanRequest = (payload: NewYearPlan): FetchNewYearPlanRequest => ({
    type: newYearPlanTypes.FETCH_NEWYEARPLAN_REQUEST,
    payload
});

export const fetchNewYearPlanSuccess = (
    payload: FetchNewYearPlanSuccessPayload
): FetchNewYearPlanSuccess => ({
    type: newYearPlanTypes.FETCH_NEWYEARPLAN_SUCCESS,
    payload
});

export const fetchNewYearPlanFailure = (
    payload:  FetchPostsFailurePayload
): FetchNewYearPlanFailure => ({
    type: newYearPlanTypes.FETCH_NEWYEARPLAN_FAILURE,
    payload
})
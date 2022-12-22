import { Type } from "typescript";
import { healthPlanTypes } from "../../constants/actionTypes";
import {
    FetchHealthPlanFailure,
    FetchHealthPlanRequest,
    HealthPlan,
    FetchHealthPlanSuccess,
    FetchHealthPlanSuccessPayload,
    FetchPostsFailurePayload,
} from "../../interfaces/types";

export const fetchHealthPlanRequest = (payload: HealthPlan): FetchHealthPlanRequest =>({
    type: healthPlanTypes.FETCH_HEALTHPLAN_REQUEST,
    payload
});

export const fetchHealthPlanSuccess = (
    payload: FetchHealthPlanSuccessPayload
): FetchHealthPlanSuccess => ({
    type: healthPlanTypes.FETCH_HEALTHPLAN_SUCCESS,
    payload
});

export const fetchHealthPlanFailure = (
    payload: FetchPostsFailurePayload
): FetchHealthPlanFailure => ({
    type: healthPlanTypes.FETCH_HEALTHPLAN_FAILURE,
    payload
})
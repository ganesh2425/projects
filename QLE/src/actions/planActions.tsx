import { planTypes } from "../constants/actionTypes";
import {
    FetchPlanFailure,
    FetchPostsFailurePayload,
    FetchPlanRequest,
    FetchPlanSuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchPlanRequest = (payload: any): FetchPlanRequest => ({
    type: planTypes.FETCH_PLAN_REQUEST,
    payload
});

export const fetchPlanSuccess = (
    payload: any
): FetchPlanSuccess => ({
    type: planTypes.FETCH_PLAN_SUCCESS,
    payload
});

export const fetchPlanFailure = (
    payload: FetchPostsFailurePayload
): FetchPlanFailure => ({
    type: planTypes.FETCH_PLAN_FAILURE,
    payload
});

export const setPlanAction = (payload: any, history: any) => ({
    type: planTypes.PLAN_INFO,
    payload,
    history
});

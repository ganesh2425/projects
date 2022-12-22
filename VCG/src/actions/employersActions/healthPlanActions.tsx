import { empHealthPlanTypes } from "../../constants/actionTypes";
import {
    FetchEmpHealthPlanFailure,
    FetchPostsFailurePayload,
    FetchEmpHealthPlanRequest,
    FetchEmpHealthPlanSuccess,
} from "../../interfaces/types";

export const fetchEmpHealthPlanRequest = (payload): FetchEmpHealthPlanRequest => ({
    type: empHealthPlanTypes.FETCH_EMPHEALTHPLAN_REQUEST,
    payload
});

export const fetchEmpHealthPlanSuccess = (
    payload: any
): FetchEmpHealthPlanSuccess => ({
    type: empHealthPlanTypes.FETCH_EMPHEALTHPLAN_SUCCESS,
    payload
});

export const fetchEmpHealthPlanFailure = (
    payload: FetchPostsFailurePayload
): FetchEmpHealthPlanFailure => ({
    type: empHealthPlanTypes.FETCH_EMPHEALTHPLAN_FAILURE,
    payload
});

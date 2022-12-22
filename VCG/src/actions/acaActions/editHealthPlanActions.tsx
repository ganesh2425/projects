import { Type } from "typescript";
import { editHealthPlanTypes } from "../../constants/actionTypes";
import {
    FetchEditHealthPlanFailure,
    FetchEditHealthPlanRequest,
    EditHealthPlan,
    FetchEditHealthPlanSuccess,
    FetchEditHealthPlanSuccessPayload,
    FetchPostsFailurePayload,
} from "../../interfaces/types";

export const fetchEditHealthPlanRequest = (payload: EditHealthPlan): FetchEditHealthPlanRequest =>({
    type: editHealthPlanTypes.FETCH_EDITHEALTHPLAN_REQUEST,
    payload
});

export const fetchEditHealthPlanSuccess = (
    payload: FetchEditHealthPlanSuccessPayload
): FetchEditHealthPlanSuccess => ({
    type: editHealthPlanTypes.FETCH_EDITHEALTHPLAN_SUCCESS,
    payload
});

export const fetchEditHealthPlanFailure = (
    payload: FetchPostsFailurePayload
): FetchEditHealthPlanFailure => ({
    type: editHealthPlanTypes.FETCH_EDITHEALTHPLAN_FAILURE,
    payload
})
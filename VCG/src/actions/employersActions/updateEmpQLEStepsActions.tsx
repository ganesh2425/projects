import { updateEmpQLEStepsTypes } from "../../constants/actionTypes";
import {
    FetchUpdateEmpQLEStepsFailure,
    FetchPostsFailurePayload,
    FetchUpdateEmpQLEStepsRequest,
    FetchUpdateEmpQLEStepsSuccess,
    FetchUpdateEmpQLEStepsSuccessPayload,
    UpdateEmpQLEStepsState
} from "../../interfaces/types";

export const fetchUpdateEmpQLEStepsRequest = (payload: any): FetchUpdateEmpQLEStepsRequest => ({
    type: updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_REQUEST,
    payload
});

export const fetchUpdateEmpQLEStepsSuccess = (
    payload: FetchUpdateEmpQLEStepsSuccessPayload
): FetchUpdateEmpQLEStepsSuccess => ({
    type: updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_SUCCESS,
    payload
});

export const fetchUpdateEmpQLEStepsFailure = (
    payload: FetchPostsFailurePayload
): FetchUpdateEmpQLEStepsFailure => ({
    type: updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_FAILURE,
    payload
});



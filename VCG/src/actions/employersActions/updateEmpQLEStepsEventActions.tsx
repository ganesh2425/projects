import { updateEmpQLEStepsEventTypes } from "../../constants/actionTypes";
import {
    FetchUpdateEmpQLEStepsEventFailure,
    FetchPostsFailurePayload,
    FetchUpdateEmpQLEStepsEventRequest,
    FetchUpdateEmpQLEStepsEventSuccess,
    FetchUpdateEmpQLEStepsEventSuccessPayload,
    UpdateEmpQLEStepsEventState
} from "../../interfaces/types";

export const fetchUpdateEmpQLEStepsEventRequest = (payload: any): FetchUpdateEmpQLEStepsEventRequest => ({
    type: updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_REQUEST,
    payload
});

export const fetchUpdateEmpQLEStepsEventSuccess = (
    payload: FetchUpdateEmpQLEStepsEventSuccessPayload
): FetchUpdateEmpQLEStepsEventSuccess => ({
    type: updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_SUCCESS,
    payload
});

export const fetchUpdateEmpQLEStepsEventFailure = (
    payload: FetchPostsFailurePayload
): FetchUpdateEmpQLEStepsEventFailure => ({
    type: updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_FAILURE,
    payload
});



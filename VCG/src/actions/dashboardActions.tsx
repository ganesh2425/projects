import { dashboardTypes } from "../constants/actionTypes";
import {
    FetchDashboardFailure,
    FetchPostsFailurePayload,
    FetchDashboardRequest,
    FetchDashboardSuccess,
     AuthResponse
} from "../interfaces/types";

export const fetchDashboardRequest = (payload: any): FetchDashboardRequest => ({
    type: dashboardTypes.FETCH_DASHBOARD_REQUEST,
    payload
});

export const fetchDashboardSuccess = (
    payload: any
): FetchDashboardSuccess => ({
    type: dashboardTypes.FETCH_DASHBOARD_SUCCESS,
    payload
});

export const fetchDashboardFailure = (
    payload: FetchPostsFailurePayload
): FetchDashboardFailure => ({
    type: dashboardTypes.FETCH_DASHBOARD_FAILURE,
    payload
});

export const setSTATESAction = (payload: any, history: any) => ({
    type: dashboardTypes.DASHBOARD_INFO,
    payload,
    history
});

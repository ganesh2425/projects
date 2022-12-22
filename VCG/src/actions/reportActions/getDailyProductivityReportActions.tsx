import { dailyProductivityReportTypes } from "../../constants/actionTypes";
import {
    FetchDailyProductivityReportFailure,
    FetchPostsFailurePayload,
    FetchDailyProductivityReportRequest,
    FetchDailyProductivityReportSuccess,
    FetchDailyProductivityReportSuccessPayload,
    Report,
} from "../../interfaces/dailyProductivityReportType";

export const fetchDailyProductivityReportRequest = (payload: Report): FetchDailyProductivityReportRequest => ({
    type: dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_REQUEST,
    payload
});

export const fetchDailyProductivityReportSuccess = (
    payload: FetchDailyProductivityReportSuccessPayload
): FetchDailyProductivityReportSuccess => ({
    type: dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_SUCCESS,
    payload
});

export const fetchDailyProductivityReportFailure = (
    payload: FetchPostsFailurePayload
): FetchDailyProductivityReportFailure => ({
    type: dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_FAILURE,
    payload
});



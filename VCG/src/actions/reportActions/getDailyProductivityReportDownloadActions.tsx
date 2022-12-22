import { dailyProductivityReportDownloadTypes } from "../../constants/actionTypes";
import {
    FetchDailyProductivityReportDownloadFailure,
    FetchPostsFailurePayload,
    FetchDailyProductivityReportDownloadRequest,
    FetchDailyProductivityReportDownloadSuccess,
    FetchDailyProductivityReportDownloadSuccessPayload,
    Report,
} from "../../interfaces/dailyProductivityReportDownloadType";

export const fetchDailyProductivityReportDownloadRequest = (payload: Report): FetchDailyProductivityReportDownloadRequest => ({
    type: dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_REQUEST,
    payload
});

export const fetchDailyProductivityReportDownloadSuccess = (
    payload: FetchDailyProductivityReportDownloadSuccessPayload
): FetchDailyProductivityReportDownloadSuccess => ({
    type: dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_SUCCESS,
    payload
});

export const fetchDailyProductivityReportDownloadFailure = (
    payload: FetchPostsFailurePayload
): FetchDailyProductivityReportDownloadFailure => ({
    type: dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_FAILURE,
    payload
});



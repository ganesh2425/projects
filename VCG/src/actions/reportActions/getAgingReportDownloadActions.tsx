import { agingReportDownloadTypes } from "../../constants/actionTypes";
import {
    FetchAgingReportDownloadFailure,
    FetchPostsFailurePayload,
    FetchAgingReportDownloadRequest,
    FetchAgingReportDownloadSuccess,
    FetchAgingReportDownloadSuccessPayload,
    Report,
} from "../../interfaces/agingReportDownloadType";

export const fetchAgingReportDownloadRequest = (payload: Report): FetchAgingReportDownloadRequest => ({
    type: agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_REQUEST,
    payload
});

export const fetchAgingReportDownloadSuccess = (
    payload: FetchAgingReportDownloadSuccessPayload
): FetchAgingReportDownloadSuccess => ({
    type: agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_SUCCESS,
    payload
});

export const fetchAgingReportDownloadFailure = (
    payload: FetchPostsFailurePayload
): FetchAgingReportDownloadFailure => ({
    type: agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_FAILURE,
    payload
});



import { sLAReportDownloadTypes } from "../../constants/actionTypes";
import {
    FetchSLAReportDownloadFailure,
    FetchPostsFailurePayload,
    FetchSLAReportDownloadRequest,
    FetchSLAReportDownloadSuccess,
    FetchSLAReportDownloadSuccessPayload,
    Report,
} from "../../interfaces/sLAReportDownloadType";

export const fetchSLAReportDownloadRequest = (payload: Report): FetchSLAReportDownloadRequest => ({
    type: sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_REQUEST,
    payload
});

export const fetchSLAReportDownloadSuccess = (
    payload: FetchSLAReportDownloadSuccessPayload
): FetchSLAReportDownloadSuccess => ({
    type: sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_SUCCESS,
    payload
});

export const fetchSLAReportDownloadFailure = (
    payload: FetchPostsFailurePayload
): FetchSLAReportDownloadFailure => ({
    type: sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_FAILURE,
    payload
});



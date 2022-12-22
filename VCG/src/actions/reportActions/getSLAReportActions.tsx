import { sLAReportTypes } from "../../constants/actionTypes";
import {
    FetchSLAReportFailure,
    FetchPostsFailurePayload,
    FetchSLAReportRequest,
    FetchSLAReportSuccess,
    FetchSLAReportSuccessPayload,
    Report,
} from "../../interfaces/sLAReportType";

export const fetchSLAReportRequest = (payload: Report): FetchSLAReportRequest => ({
    type: sLAReportTypes.FETCH_SLA_REPORT_REQUEST,
    payload
});

export const fetchSLAReportSuccess = (
    payload: FetchSLAReportSuccessPayload
): FetchSLAReportSuccess => ({
    type: sLAReportTypes.FETCH_SLA_REPORT_SUCCESS,
    payload
});

export const fetchSLAReportFailure = (
    payload: FetchPostsFailurePayload
): FetchSLAReportFailure => ({
    type: sLAReportTypes.FETCH_SLA_REPORT_FAILURE,
    payload
});



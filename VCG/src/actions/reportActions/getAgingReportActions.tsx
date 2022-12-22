import { agingReportTypes } from "../../constants/actionTypes";
import {
    FetchAgingReportFailure,
    FetchPostsFailurePayload,
    FetchAgingReportRequest,
    FetchAgingReportSuccess,
    FetchAgingReportSuccessPayload,
    Report,
} from "../../interfaces/agingReportType";

export const fetchAgingReportRequest = (payload: Report): FetchAgingReportRequest => ({
    type: agingReportTypes.FETCH_AGING_REPORT_REQUEST,
    payload
});

export const fetchAgingReportSuccess = (
    payload: FetchAgingReportSuccessPayload
): FetchAgingReportSuccess => ({
    type: agingReportTypes.FETCH_AGING_REPORT_SUCCESS,
    payload
});

export const fetchAgingReportFailure = (
    payload: FetchPostsFailurePayload
): FetchAgingReportFailure => ({
    type: agingReportTypes.FETCH_AGING_REPORT_FAILURE,
    payload
});



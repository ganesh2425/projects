import { quantitiesReportTypes } from "../../constants/actionTypes";
import {
    FetchQuantitiesReportFailure,
    FetchPostsFailurePayload,
    FetchQuantitiesReportRequest,
    FetchQuantitiesReportSuccess,
    FetchQuantitiesReportSuccessPayload,
    QuantitiesReport,
} from "../../interfaces/quantitiesReportType";

export const fetchQuantitiesReportRequest = (payload: QuantitiesReport): FetchQuantitiesReportRequest=> ({
    type: quantitiesReportTypes.FETCH_QUANTITIES_REPORT_REQUEST,
    payload
});

export const fetchQuantitiesReportSuccess = (
    payload: FetchQuantitiesReportSuccessPayload
): FetchQuantitiesReportSuccess => ({
    type: quantitiesReportTypes.FETCH_QUANTITIES_REPORT_SUCCESS,
    payload
});

export const fetchQuantitiesReportFailure = (
    payload: FetchPostsFailurePayload
): FetchQuantitiesReportFailure => ({
    type: quantitiesReportTypes.FETCH_QUANTITIES_REPORT_FAILURE,
    payload
});



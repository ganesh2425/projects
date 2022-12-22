import { quantitiesReportDownloadTypes } from "../../constants/actionTypes";
import {
    FetchQuantitiesReportDownloadFailure,
    FetchPostsFailurePayload,
    FetchQuantitiesReportDownloadRequest,
    FetchQuantitiesReportDownloadSuccess,
    FetchQuantitiesReportDownloadSuccessPayload,
    QuantitiesReport,
} from "../../interfaces/quantitiesReportDownloadType";

export const fetchQuantitiesReportDownloadRequest = (payload: QuantitiesReport): FetchQuantitiesReportDownloadRequest=> ({
    type: quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_REQUEST,
    payload
});

export const fetchQuantitiesReportDownloadSuccess = (
    payload: FetchQuantitiesReportDownloadSuccessPayload
): FetchQuantitiesReportDownloadSuccess => ({
    type: quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_SUCCESS,
    payload
});

export const fetchQuantitiesReportDownloadFailure = (
    payload: FetchPostsFailurePayload
): FetchQuantitiesReportDownloadFailure => ({
    type: quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_FAILURE,
    payload
});



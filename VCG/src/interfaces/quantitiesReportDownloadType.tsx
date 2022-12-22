import { quantitiesReportDownloadTypes } from "../constants/actionTypes";


export type FetchQuantitiesReportDownloadFailure = {
  type: typeof quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchQuantitiesReportDownloadRequest {
  type: typeof quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_REQUEST;
  payload: QuantitiesReport;
}

export type FetchQuantitiesReportDownloadSuccess = {
  type: typeof quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_SUCCESS;
  payload: FetchQuantitiesReportDownloadSuccessPayload;
};

export interface QuantitiesReport {
  report : string
}

export interface FetchQuantitiesReportDownloadSuccessPayload {
  report : string
}

export interface QuantitiesReportState {
  pending: boolean,
  error: string | null,
  data: '',
  id: 0,
  startDate: '',
  endDate: '',
  year: 0,
  timeline:'',
  searchType:'',
  contentType:'',
  response:'',
  body:''
}

export type QuantitiesReportActions =
  | FetchQuantitiesReportDownloadRequest
  | FetchQuantitiesReportDownloadSuccess
  | FetchQuantitiesReportDownloadFailure;
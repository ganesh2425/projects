import { agingReportDownloadTypes } from "../constants/actionTypes";


export type FetchAgingReportDownloadFailure = {
  type: typeof agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchAgingReportDownloadRequest {
  type: typeof agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_REQUEST;
  payload: Report;
}

export type FetchAgingReportDownloadSuccess = {
  type: typeof agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_SUCCESS;
  payload: FetchAgingReportDownloadSuccessPayload;
};

export interface Report {
  report : string
}

export interface FetchAgingReportDownloadSuccessPayload {
  report : string
}

export interface AgingReportState {
  pending: boolean,
  error: string | null,
  employer: string,
  employee: string,
  date: string,
  data: ''
}

export type AgingReportDownloadActions =
  | FetchAgingReportDownloadRequest
  | FetchAgingReportDownloadSuccess
  | FetchAgingReportDownloadFailure;
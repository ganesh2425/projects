import { sLAReportDownloadTypes } from "../constants/actionTypes";


export type FetchSLAReportDownloadFailure = {
  type: typeof sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchSLAReportDownloadRequest {
  type: typeof sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_REQUEST;
  payload: Report;
}

export type FetchSLAReportDownloadSuccess = {
  type: typeof sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_SUCCESS;
  payload: FetchSLAReportDownloadSuccessPayload;
};

export interface Report {
  report : string
}

export interface FetchSLAReportDownloadSuccessPayload {
  report : string
}

export interface SLAReportState {
  pending: boolean,
  error: string | null,
  employer: string,
  employee: string,
  startDate: string,
  endDate: string,
  data: ''
}

export type SLAReportDownloadActions =
  | FetchSLAReportDownloadRequest
  | FetchSLAReportDownloadSuccess
  | FetchSLAReportDownloadFailure;
import { dailyProductivityReportDownloadTypes } from "../constants/actionTypes";


export type FetchDailyProductivityReportDownloadFailure = {
  type: typeof dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchDailyProductivityReportDownloadRequest {
  type: typeof dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_REQUEST;
  payload: Report;
}

export type FetchDailyProductivityReportDownloadSuccess = {
  type: typeof dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_SUCCESS;
  payload: FetchDailyProductivityReportDownloadSuccessPayload;
};

export interface Report {
  report : string
}

export interface FetchDailyProductivityReportDownloadSuccessPayload {
  report : string
}

export interface ReportState {
  pending: boolean,
  error: string | null,
  employer: string,
  employee: string,
  date: string,
  data: ''
}

export type DailyProductivityReportDownloadActions =
  | FetchDailyProductivityReportDownloadRequest
  | FetchDailyProductivityReportDownloadSuccess
  | FetchDailyProductivityReportDownloadFailure;
import { dailyProductivityReportTypes } from "../constants/actionTypes";


export type FetchDailyProductivityReportFailure = {
  type: typeof dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchDailyProductivityReportRequest {
  type: typeof dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_REQUEST;
  payload: Report;
}

export type FetchDailyProductivityReportSuccess = {
  type: typeof dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_SUCCESS;
  payload: FetchDailyProductivityReportSuccessPayload;
};

export interface Report {
  report : string
}

export interface FetchDailyProductivityReportSuccessPayload {
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

export type DailyProductivityReportActions =
  | FetchDailyProductivityReportRequest
  | FetchDailyProductivityReportSuccess
  | FetchDailyProductivityReportFailure;
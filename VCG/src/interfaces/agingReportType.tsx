import { agingReportTypes } from "../constants/actionTypes";


export type FetchAgingReportFailure = {
  type: typeof agingReportTypes.FETCH_AGING_REPORT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchAgingReportRequest {
  type: typeof agingReportTypes.FETCH_AGING_REPORT_REQUEST;
  payload: Report;
}

export type FetchAgingReportSuccess = {
  type: typeof agingReportTypes.FETCH_AGING_REPORT_SUCCESS;
  payload: FetchAgingReportSuccessPayload;
};

export interface Report {
  report : string
}

export interface FetchAgingReportSuccessPayload {
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

export type AgingReportActions =
  | FetchAgingReportRequest
  | FetchAgingReportSuccess
  | FetchAgingReportFailure;
import { sLAReportTypes } from "../constants/actionTypes";


export type FetchSLAReportFailure = {
  type: typeof sLAReportTypes.FETCH_SLA_REPORT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchSLAReportRequest {
  type: typeof sLAReportTypes.FETCH_SLA_REPORT_REQUEST;
  payload: Report;
}

export type FetchSLAReportSuccess = {
  type: typeof sLAReportTypes.FETCH_SLA_REPORT_SUCCESS;
  payload: FetchSLAReportSuccessPayload;
};

export interface Report {
  report : string
}

export interface FetchSLAReportSuccessPayload {
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

export type SLAReportActions =
  | FetchSLAReportRequest
  | FetchSLAReportSuccess
  | FetchSLAReportFailure;
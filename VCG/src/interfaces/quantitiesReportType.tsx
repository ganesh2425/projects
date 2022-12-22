import { quantitiesReportTypes } from "../constants/actionTypes";


export type FetchQuantitiesReportFailure = {
  type: typeof quantitiesReportTypes.FETCH_QUANTITIES_REPORT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchQuantitiesReportRequest {
  type: typeof quantitiesReportTypes.FETCH_QUANTITIES_REPORT_REQUEST;
  payload: QuantitiesReport;
}

export type FetchQuantitiesReportSuccess = {
  type: typeof quantitiesReportTypes.FETCH_QUANTITIES_REPORT_SUCCESS;
  payload: FetchQuantitiesReportSuccessPayload;
};

export interface QuantitiesReport {
  report : string
}

export interface FetchQuantitiesReportSuccessPayload {
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
  | FetchQuantitiesReportRequest
  | FetchQuantitiesReportSuccess
  | FetchQuantitiesReportFailure;